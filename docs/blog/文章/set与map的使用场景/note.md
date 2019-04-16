# Set与Map



TODO: 改为内部直接建立的对象，改为硬编码。

先来看看一种错误：

```js
var o = {
    name: "eor"
}

var arr = [1, 2, 3, o, 1, o, 3, {name: "bibi"}]
var obj = {};
var newArr = [];

// 去重
for (let i = 0; i < arr.length; i++) {
    if ( !obj[ arr[i] ]) {
        newArr.push(arr[i]);
        obj[arr[i]] = true;
    }
}

console.log(obj)
console.log(newArr)
```

弱类型语言，其自动调用了 toString 方法，导致内部存放的对象会自动转换为字符串。对象的排重将会出错。



而 set 可以解决这个问题：

```js
var o = {
    name: "eor"
}

var arr = [1, 2, 3, o, 1, o, 3, {name: "bibi"}]
let oS = new Set(arr);

console.log(oS)
```

观察可以发现，内容相同的对象被消重，而不同的内容不同的对象则留存。



拿来做并集：

```js
var arr1 = [1, 2, 3, 2, 3];
let arr2 = [3, 2, 4, 4, 5];
let oS = new Set([...arr1, ...arr2])
```

拿来做交集：

```js
var oS1 = new Set(arr1);
var arr2 = new Set(arr2);

[...oS1].filter( (el) => oS2.has(el))
```

利用 Set 和 filter。



拿来做差集：

```js
var oS1 = new Set(arr1);
var arr2 = new Set(arr2);

```

则所有属于A且不属于B的元素构成的集合，叫做集合A减集合B(或集合A与集合B之差。



全集为｛1,2,3,4,5｝ 那么｛1,2｝的补集就是｛3,4,5｝



## Map

本质上是键值对的集合。

原理实现：链表、hash 算法、桶

更强的键值对，不过却不是用对象来表达，而是用数组 ["key", value]，每一个键值对都是一个数组，数组的 0 位就是键，1 位就是值。

先看一个场景：

```js
var data = {};
var oDiv = document.getElementById('demo');
data[oDiv] = "eor";
console.log(data)
```

由于 DOM 是个对象，所以这样存储会出现问题，编程 null: "eor"，还是自动 toString 的锅，由于 DOM 对象的原型链上没有了，所以会显示 null。

但是这样其实是一个非常符合人类的写法，我们可以使用 Map 来进行支持。

存取：

```js
var oMp = new Map();
var obj1 = {};
var obj2 = {};

oMp.set('name', 'eor')
oMp.set(obj1, 'obj1');
oMp.set(obj2, 'obj2');

oMp.get('name')
oMp.get(obj1)
oMp.get(obj2)
```

注意引用类型的存取，引用类型需要一个变量将其地址值给保存下来，这样才能通过地址值来读取。

他本身是可迭代对象，也可以用 oMp.keys()  for...of for...in来遍历





