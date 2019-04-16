# 模拟Map

参考：

* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

一个 Map 说白了就是个链表，先通过对象（指针）来达到存储任意数据类型的目的，然后将传入的键值通过 hash 算法来计算要存储的地址，并且没有哈希碰撞的策略，也就是说哈希值计算一样就直接覆盖。

很明显可以看出 Map 涉及到了地址空间的读写操作，是不可能用 JS 真正实现的，必须要用能操控指针的语言来实现：C/C++、Rust。所以只能是模拟一下，这种模拟的行为更类似于用一个动态语言实现了一个动态一样那样简单~不过用于理解是足以。



> 同时 Map 是个链表，所以增删改都要快一些，但是查就要慢于数组（顺序表）了。



## 思路

1. 存放：直接使用对象来存放东西即可，
2. 计算存放地址：我们可以利用数组来模拟特定范围的地址空间，然后用 hash 来确保存放地址不会超出这段范围，同时不需要考虑 hash 碰撞，哈希值一样的话直接覆盖就可以了。
3. 存储空间的自动扩充：可以每隔一段时间计算一下占用空间是否有达到 1/3，如果有就扩充哈希表

## 实现

初始化桶

```js
function myMap() {
    this.bucektLength = 8;
    this.init();
}

myMap.prototype.init = function() {
    //初始化
    this.bucekt = new Array(this.bucektLength);
    for (let i = 0; i < this.bucekt.length; i++) {
        this.bucekt[i] = {
            type: "bucekt_" + i,
            next: null
        }
    }
}

myMap.prototype.doHash = function(key) {
    let hash = 0;
    let keyType = typeof key;
    switch (keyType) {
    case "string":
        let calcStrNum = key.length < 3 ? key.length : 3;
        for (let i = 0; i < calcStrNum; i++) {
            hash += key[i] ? key.charCodeAt(i) : 0;
        }
        break;
    case "number":
        // 规定传入 NaN 无用
        hsah = Objec.is(keyType, NaN) ? 0 : key;
        break;
    case "object":
        // null {} []
        hash = 1;
        break;
    case "boolean":
        // true false 转为 1、0
        hash = Number(key)
        break;
    default:
        // undefined function(){}
        hash = 2
        break
    }
    return hash % key.length
}

// 第一个元素是头部，如果只有头部元素，那么就相当于直接返回 false
myMap.prototype.set = function(key, value) {
    let hash = this.doHash(key);
    let nowObj = this.bucekt[hash];
    let isNofound = true
    while (nowObj.next) {
        if (nowObj.next.key === key) {
            isNofound = false
            nowObj.next.value = value;
        }
        nowObj = nowObj.next;
    }
    if (isNofound) {
        nowObj.next = {
            key,
            value,
            next: null
        }
    }

}

myMap.prototype.get = function (key) {
    let nowObj = this.bucekt(key);
    while(nowObj.next) {
        if(nowObj.next.key === key) return nowObj.next.value
    }
    return false
}


myMap.prototype.has = function (key) {
    let nowObj = this.bucekt(key);
    while(nowObj.next) {
        if(nowObj.next.key === key) return true
    }
    return false
}

myMap.prototype.delete = function () {
    
}





var tmpMyMap = new myMap();
tmpMyMap.set("n1", "n1");
tmpMyMap.set("n2", "n2");
tmpMyMap.set("n1", "n1被后续同名覆盖")

console.log(tmpMyMap)

```

哈希计算的方式很多，这里简单用对传入字符串的后三位取模来计算，其目的是映射在地址空间中，所以模数为地址空间的大小，即 数/spaceLength：

```js
myMap.prototype.doHash = function(key) {
    let hash = 0;
    let keyType = typeof key;
    switch (keyType) {
    case "string":
        let calcStrNum = key.length < 3 ? key.length : 3;
        for (let i = 0; i < calcStrNum; i++) {
            hash = key[i] ? key.charCodeAt(i) : 0;
        }
        break;
    case "number":
        // 规定传入 NaN 无用
        hsah = Objec.is(keyType, NaN) ? 0 : key;
        break;
    case "object":
        // null {} []
        hash = 1;
        break;
    case "boolean":
        // true false 转为 1、0
        hash = Number(key)
        break;
    default:
        // undefined function(){}
        hash = 2
        break
    }
    return hash%key.length
}
```



> 这里要注意 JS 的设计缺陷 NaN == NaN 会返回 false，所以需要用 Object.is(NaN, NaN) 返回 true 来判断。NaN  可是 number 类型。

哈希算法就是为了快速，其快速建立在均衡的空间分配上，string 类型的 key 是数量最多的，因此尽量将 string 均衡的分配到各个空间，所以 string 类型的处理可能返回空间内的任意一个桶。其他的数量太少，随便定死一个得了。

set:

```js
myMap.prototype.set = function(key, value) {
    let hash = this.doHash(key);
    // 拿到对应链条的头
    let nowObj = this.bucekt[hash];
    let isNofound = true
    while (nowObj.next) {
        if (nowObj.next.key === key) {
            isNofound = false
            nowObj.next.value = value;
        }
        nowObj = nowObj.next;
    }
    if (isNofound) {
        nowObj.next = {
            key,
            value,
            next: null
        }
    }

}

var tmpMyMap = new myMap();
tmpMyMap.set("n1", "n1");
tmpMyMap.set("n2", "n2");
tmpMyMap.set("n1", "n1被后续同名覆盖")

console.log(tmpMyMap)
```

get：



delete，注意别出现野指针就行了，不过 JS 出现野指针也会被垃圾清理器回收：

has：

clear：



[`Objects`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 和 `Maps` 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 `Maps` 使用。不过 `Maps` 和 `Objects` 有一些重要的区别，在下列情况里使用 `Map` 会是更好的选择：

- 一个`Object`的键只能是[`字符串`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)或者 [`Symbols`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)，但一个 `Map` 的键可以是**任意值**，包括函数、对象、基本类型。
- Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。
- 你可以通过 `size` 属性直接获取一个 `Map` 的键值对个数，而 `Object` 的键值对个数只能手动计算。
- `Map` 可直接进行迭代，而 `Object` 的迭代需要先获取它的键数组，然后再进行迭代。
- `Object` 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 `map = Object.create(null)` 来创建一个没有原型的对象，但是这种用法不太常见。
- `Map` 在涉及频繁增删键值对的场景下会有些性能优势。





1.开放地址法
 开放地执法有一个公式:Hi=(H(key)+di) MOD m i=1,2,…,k(k<=m-1)
 基本思想：当发生地址冲突时，按照某种方法继续探测哈希表中的其他存储单元，直到找到空位置为止。
 2.rehash（再hash法）
 使用第二个或第三个...计算地址，知道无冲突。比如：按首字母进行hash冲突了，则按照首字母第二位，进行hash寻址。
 3.链地址法（拉链法）
 创建一个链表数组，数组中每一格就是一个链表。若遇到哈希冲突，则将冲突的值加到链表中即可。

特点：

1. 键不会重复，键一样的话，后面的会覆盖前面的
2. 可以存储任意东西：基本数据类型、数组、字符串、NaN、null、对象、函数
3. 具有 set、get、delete、has、clear 方法

