# 实现事件总线 EventBus



> 一言蔽之：事件总线是一个简便的，跨语言通用的小型通讯解决方案。



React、Vue 中组件间如何进行通讯？

**Vue**

1. 父子组件用 Props 通信
2. 用 Event Bus 通信
3. 利用第三方库 Vuex 等全局状态管理库通信

**React**

1. 父传子直接用 Props 传递，子传父需要父组件先传递一个函数，子组件传值调用父组件传递的函数
2. 用发布订阅模式的 Event 模块
3. 第三方库 Redux、Mobx 等全局状态管理管库
4. 用新的[Context Api](https://juejin.im/post/5a7b41605188257a6310fbec)

可以看到事件总线其实是通用的不同组件通讯方法，其实在任何语言中都能够被使用，其**本质就是一个发布/订阅设计模式的实现**。

> 发布/订阅模式是观察者模式的一种变形，两者区别在于，发布/订阅模式在观察者模式的基础上，在目标和观察者之间增加一个调度中心。

我们可以使用 EventBus 来作为沟通桥梁的概念，就像是所有组件共用**相同的事件中心**，可以向该中心注册发送事件或接收事件，所以组件可以方便的通过中心来传输数据，但是事件总线不适合大型的项目，因为没有模块化设计，这将在大型项目中变得难以维护。

使用 Event Bus 进行跨组件消息传递很棒，但是，当事件非常多的时候，Event Bus 就变得难以维护，这与使用全局变量一样一个道理。变量能局部的，就不要放到全局，而 Event Bus 上的事件都是全局。

但是中小型项目使用 EventBus 可以说是恰如其分，小型网站开发更适合使用 EventBus 而不是使用其他专门的状态管理库。



## VanillaJS 中的实现



首先我们需要一个存储事件的结构：

```js
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}

```



首先，一个事件可以被多个回调函数给订阅，也就是触发某个事件将会导致多个回调被运行，那么我们保存事件 addListener() 时最好是以数组的形式来保存，并且在 emit() 时也应当将要执行一个数组中的所有的函数。

综上，我们只需要实现三点：

1. 初始化一个键值对的数据结构，能存储形如：`type: [callBack1, callBack2]` 的键值对，左边为字符串，右边为一个数组，这个数组存放的都是函数。

2. 添加监听时，将新的回调函数全部存放都对应事件的数组中。
3. 触发事件时，将对应事件的数组内的所有函数触发。



### 简单的实现：

```js
class EventEmitter {
    constructor() {
        // 初始化键值对
        this._event = new Map();
    }
    
    on(type, fn) {
        const olderValList = this._event.get(type);
        if (olderValList) olderValList.push(fn);
        else this._event.set(type, [fn]);
    }

    emit(type, ...args) {
        const callBackList = this._event.get(`${type}`);
        if (!callBackList) throw `事件类型：${type} 不存在。`;
        if (callBackList.length === 0) throw `事件类型：${type} 未绑定任何回调。`;
        callBackList.map( (valFn) => valFn.call(this, ...args) );
    }
}

tmp = new EventEmitter();

tmp.on("aa", () => console.log("i'm aa!"))
tmp.emit('aa')

tmp.on("bbb", (val) => console.log('first ' + val))
tmp.on("bbb", (val) => console.log('second ' + val))
tmp.emit('bbb', "form emit value~")

// output
// i'm aa!
// first form emit value~
// second form emit value~
```

简单的版本已经能够监听多个事件，并且能触发绑定在同一个事件上多个回调函数。

剩下的无非是添加一些能够删除事件和限制事件上限的一些函数了，只是一些杂事，其核心概念就这么点。

### 稍稍完善

再写两个函数：

1. 实现移除回调的功能。

2. 实现 once 的功能，只运行一次会很实用。



对于 once 的实现需要考虑一下，因为无法确定传入的函数是否匿名，所以要自行书写一个具名函数 toSuicide() ，添加和删除回调时就删除这个具名函数即可，至于传入的回调就放在 toSuicide 内执行就行了。



至于做移除事件的话，回调必须保留函数签名(指针)才能被匹配，至于匿名函数的话根本就匹配不到，只能全部移除。



```js
class EventEmitter {
    constructor() {
        // 初始化键值对
        this._event = new Map();
    }
    
    on(type, fn) {
        const olderValList = this._event.get(type);
        if (olderValList) olderValList.push(fn);
        else this._event.set(type, [fn]);
    }
    
    off(type, fn) {
        const fnList = this._event.get(type);
        if (!fnList) throw `事件类型：${type} 不存在。`;
        if (fnList.indexOf(fn) != -1) fnList.pop(fnList.indexOf(fn));
    }

    once(type, fn) {
        function toSuicide(...args) {
            this.off(type, toSuicide);
            fn.call(this, ...args);
        }

        this.on(type, toSuicide);
    }
    
    emit(type, ...args) {
        const callBackList = this._event.get(`${type}`);
        if (!callBackList) throw `事件类型：${type} 不存在。`;
        if (callBackList.length === 0) console.warn(`事件类型：${type} 未绑定任何回调。`);
        callBackList.map( (valFn) => valFn.call(this, ...args) );
    }
}

tmp = new EventEmitter();

function testRemove () {console.log("testRemove")}

tmp.on("testRemove", testRemove);
tmp.emit('testRemove');
tmp.off("testRemove", testRemove);
tmp.emit('testRemove');

function runOnce () {console.log("only run once!")};

tmp.once('runOnce', runOnce);
tmp.emit('runOnce');
tmp.emit('runOnce');

// testRemove
// warn: 事件类型：testRemove 未绑定任何回调。
// only run once!
// warn: 事件类型：runOnce 未绑定任何回调。
```



嘛，也就这样了，足以完整的体现 EventBus 的概念了。至于什么最大监听数，错误类型判断什么的，都不是重点。



## VUE 中的实现

> 之所以要提 Vue 是因为其相当于内置了一个事件总线。

Vue 中的事件总线实现起来异常简单，原因是 Vue 其本身就实现了一个观察者模式，也就是事件总线，在子组件像父组件传值的时候就能发现，子组件是通过调用 $emit 来触发一个事件，而父组件则是通过监听这个事件来接收传来的值。



所以，每一个 Vue 的实例都具备事件总线的能力，我们只需要 new 一个 Vue 的实例，然后将这个实例当作事件总线即可。



如下：

```js
// 法 1，模块法
// 通过模块导出一个事件总线的实例，只要 import 了这个的就相当于共用一个事件总线
import Vue from 'vue'
export const EventBus = new Vue()


// 法 2，全局总线
// 相当于在 Vue 的原型链上加了一个事件总线，这样所有 Vue 实例都带了这个总线
// 而且由于是引用，所以所有的实例都共用一个事件总线
import Vue from 'vue'
Vue.prototype.$EventBus = new Vue()
```

用模块导出的比用全局总线的扩展性要强很多，因为可以使用不同的事件总线处理不同的事情，比如可以准备两个总线模块 a.js、b.js 分别处理 a、b 类型的事件，实现一个简单的区分。



当然，如果业务复杂的话还是记得使用专业的状态管理库，不过划分模块的事件总线，中小型网站开发完全足够。



> 什么？你说对于事件总线而言，一个 Vue 实例太囊肿，因为九成的功能根本用不到？
>
> > 管他的，这么一丢丢内存浪费而已！现在硬件那么便宜！



问：为什么经常见到很多个 .vue 文件都 import 了事件总线，而 import 本事其实相当于执行了引入的模块，这样不会有冲突么？

答：需要明白的是，多个文件内 import 多个相同的值，JS 引擎只会执行第一次的 import 罢了，所以从始至终只会有一个实例，换句话说 import 出来的对象都是单例模式。



## 参考：

* [掘金](https://juejin.im/post/5ac2fb886fb9a028b86e328c)