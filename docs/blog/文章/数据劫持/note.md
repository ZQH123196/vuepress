# ES5-数据劫持

[[toc]]

## 数据劫持-ES5

嘛，时光推移，现在 VUE3 都要放弃 ES5 的 defineProperty 改用 Proxy&Reflect 实现了，ES6 的未来已来。ES5 的数据劫持一直用，一直没总结，是时候来一波了，同时也是为 ES6 版的数据劫持做铺垫。

VUE2 双向数据绑定的核心功能由 Observer、Compile、Watcher 三部分实现，其中 Observer 部分的功能正是由 ES5 的 Object.defineProperty 实现。

> Observer：监测数据变化进行相应回调（数据劫持）。

### 思路

说到数据劫持这玩意，当初第一个念头就是 Python 中的魔法函数，那些魔法函数说白就是在底下偷偷的干些事情，其中一些就用到了数据劫持，这在 Python 中被称作代理，在设计模式中被称作代理模式，但这些名称，都没有`数据劫持`来的帅气！

不过帅气归帅气，其内部的实现原理其实差不多，都是依赖于 get、set 来进行操作。
没什么复杂的。

举个栗子，input 框与 div 展示框的同步：
1. 存在一对象 data，内有数据 value，并为 data 内所有值添加 set 函数；
2. 当往 input 框输入时，将触发 input 标签的 oninput 函数，然后在函数内将 input 的 value 值赋值给 data.value；
3. 当 data.value 被赋值，将触发对应值的 set 函数，此时有调用链：`输入->触发 oninput 函数->触发 data.value 的 set 函数->完成 set 函数回到 oninput 函数`；
4. 在 data.value 的 set 函数中进行赋值操作，并将值也赋值到用于展示的 div 中。此时有调用链：`输入->触发 oninput 函数->触发 data.value 的 set 函数->触发 updata 函数->完成 updata 函数回到 set 函数->完成 set 函数回到 oninput 函数`

### 实现

<p><iframe style="width: 100%; height: 4rem;" src="/note/ES5-数据劫持/demo1.html" frameborder="0"></iframe></p>

1. 创建对象，并监听其变化
```js
function Observer(data) {
    // 数据为空或不是对象，就没有监控的意义了
    if (!data || typeof data != "object") {
        return data;
    }
    Object.keys(data).forEach(function (key) {
        definedRective(data, key, data[key]);
    });
}
function definedRective(data, key, val) {
    Object.defineProperty(data, key, {
        get() {
            return val;
        },
        set(newValue) {
            if (newValue == val) { return };
            val = newValue;
        }
    })
}
let oData = {
    value: ''
};
Observer(oData);
```

2. 创建输入框（input）和用于显示同步效果的展示框（div），并写出二框的同步函数。
```html
<input id="ES5-dataGrab-input" type="text" value="eor" />

<div id="ES5-dataGrab"></div>
```
```js
let oInput = document.getElementById("ES5-dataGrab-input");
let oDiv = document.getElementById('ES5-dataGrab');

function upData() {
    oDiv.innerText = oData.value;
}
upData(); // 先同步一次
```

3. 用 input 输入时的触发函数将输入值与 data.value 的 set 函数连结，此时有调用链：`输入->触发 oninput 函数->触发 data.value 的 set 函数->完成 set 函数回到 oninput 函数`
```js
oInput.oninput = function () {
    // 当 data.value 被赋值，将触发对应值的 set 函数；
    oData.value = this.value;
}
```

4. 将 set 函数修改，使其调用步骤 2 的同步函数，此时有调用链：`输入->触发 oninput 函数->触发 data.value 的 set 函数->触发 updata 函数->完成 updata 函数回到 set 函数->完成 set 函数回到 oninput 函数`
```js
function definedRective(data, key, val) {
    Object.defineProperty(data, key, {
        get() {
            return val;
        },
        set(newValue) {
            if (newValue == val) { return };
            val = newValue;
            upData(); // 添加同步函数
        }
    })
}
```
:::tip
这就是数据劫持了，没有考虑到监听复杂数据类型，但也没必要，因为数据劫持已经诠释完毕了。
:::

:::warning
Object.defineProperty 的缺点：
1. 不能直接监听数组
2. 如果有新添加的数据，不能自动添加新数据的监听
:::


### ES5 版源码
<<< docs\.vuepress\public\note\ES5-数据劫持\demo1.html

## 数据劫持-ES6



参考：
* [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* [Proxy/handler](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)


在数据劫持的基础上先看看 Object.defineProperty 的缺点：
1. 不能直接监听数组
2. 如果有新添加的数据，不能自动添加新数据的监听

而 Proxy 可以解决以上 Object.defineProperty 的痛点。

> 唯一遗憾的是，babel 是不能将 Proxy&Reflect 给转译成 ES5 的，因为 Proxy&Reflect 有对浏览器要求实现一些底层的 c++ 代码。

### 思路与实现

<p><iframe style="width: 100%; height: 4rem;" src="/note/ES5-数据劫持/demo2.html" frameborder="0"></iframe></p>

这思路当然是没变化的，相当于换了 API 而已，仅需修改 ES5 版的步骤 1 即可：
1. 创建对象，并监听其变化
```js
let oData = {
    value: ''
};

let oProxyData = new Proxy(oData, {
    get(target, name) {
        return Reflect.get(target, name)
    },
    set(target, name, value) {
        Reflect.set(target, name, value)
    }
})
```

当然了，针对 Object.defineProperty 的缺点，Proxy 可以代理原生数组，并且任何时候新增的数据也会被代理：
```js
var tmp = ["0", ]
var proxyTmp = new Proxy(tmp, {get(){console.log("已被代理")}})
tmp.push('1')
console.log(proxyTmp[0])
console.log(proxyTmp[1]) // 新数据也被添加了 get，将会输出已被代理.
```

用起来简直不要太简单，同一个例子，不仅代码量减少了，而且功能还增加了，我凸(艹皿艹 )！



### ES6 版源码
<<< docs\.vuepress\public\note\ES5-数据劫持\demo2.html
