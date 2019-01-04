# call & apply 的模拟实现
[[toc]]
## 前言:

用 ES6 的语法模拟 ES3 的 call 和 apply，因为浏览器引擎的支持不会倒退到 ES3，重在理解。

参考：
* [冴羽的博客](https://github.com/mqyqingfeng/Blog/issues/11)
* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

---

## 分析 call
正版 call 的语法：
```js
fun.call(thisArg, arg1, arg2, ...)
```

我们期望类似的语法：
```js
fun.call_imitation(thisArg, arg1, arg2, ...)
```

**call 的功能**：
1. call() 提供新的 this 值给当前调用的函数/方法。你可以使用call来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。
2. call() 给定参数后将会立即执行此函数。
3. 如果这个函数处于“非严格模式”，则指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中就是 window 对象)，同时值为原始值(数字，字符串，布尔值)的 this 会指向该原始值的自动包装对象。

功能一的的实现只需要简单的复制。

功能二的实现要把参数弄齐全，然后在参数齐全情况下执行自己一次即可。
> 这用 ES6 的参数解构来做十分的容易，否则就需要用 eval 来做。

功能三的实现只需要一行：
`let context = context || window;`
null 跟 undefined 都会推算为 false，所以 context 为 null 和 undefined 时将会取值 window，用在 node 就换成 global。

---

## 实现 call

1. 将调用 call 的函数挂载到传进来的对象上，调用方此时就变成了这个对象上的一个方法：
`context.fn = this;`
2. 然后在将其余的参数加进去：
`let result = context.fn(...args);`
3. 最后调用被挂载了上下文的自己：
`let result = context.fn(...args); `

<<< @/docs/blog/imitation/callapply/call.js

---

## 实现 apply

call 与 apply 只有一个区别，就是 call() 方法接受的是若干个参数的列表，而 apply() 方法接受的是一个包含多个参数的数组。
所以 apply 只需要将传入参数改为数组即可：

<<< @/docs/blog/imitation/callapply/apply.js
