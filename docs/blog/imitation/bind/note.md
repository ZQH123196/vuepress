# bind 的模拟实现
[[toc]]
## 前言:

模拟 bind。

参考：
* [冴羽的博客](https://github.com/mqyqingfeng/Blog/issues/11)
* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

---

## 分析 bind

正版 call 的语法：
```js
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

我们期望类似的语法：
```js
fun.bind_imitation(thisArg[, arg1[, arg2[, ...]]])
```

**bind 的功能**：
1. 返回一个函数。
> bind() 函数会创建一个新绑定函数（bound function，BF）。绑定函数是一个exotic function object（怪异函数对象，ECMAScript 2015中的术语），它包装了原函数对象。调用绑定函数通常会导致执行包装函数。
>> 绑定函数具有以下内部属性：
>>    [[BoundTargetFunction]] - 包装的函数对象
>>    [[BoundThis]] - 在调用包装函数时始终作为this值传递的值。
>>    [[BoundArguments]] - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
>>    [[Call]] - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。
>>
>>当调用绑定函数时，它调用[[BoundTargetFunction]]上的内部方法[[Call]]，就像这样>>Call(boundThis, args)。其中，boundThis是[[BoundThis]]，args是[>>[BoundArguments]]加上通过函数调用传入的参数列表。

2. 可以传入全部参数或是**部分参数*。

功能一，

功能二使得 bind 变得更灵活易用，当然也增加了一定的复杂性，看这个例子：
```js
let foo  = {
    value: 1
};

function baz(name, age) {
    console.log(this.value, name, age);
}

let bindFoo  = baz.bind(foo, 'vim');
bindFoo('18'); // 1 'vim' '18'
```
瞧，你可以在 bind 的时候进行部分参数的指定，这就相当于提前赋值
