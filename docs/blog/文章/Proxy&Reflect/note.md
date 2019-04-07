# Proxy&Reflect

参考：
* [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* [Proxy/handler](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)
* [可代理方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)

在数据劫持的基础上先看看 Object.defineProperty 的缺点：
1. 不能直接监听数组
2. 如果有新添加的数据，不能自动添加新数据的监听

而 Proxy 可以解决以上 Object.defineProperty 的痛点。

> 唯一遗憾的是，babel 是不能将 Proxy&Reflect 给转译成 ES5 的，因为 Proxy&Reflect 有对浏览器要求实现一些底层的 c++ 代码。

## 思路与实现

我越看越觉得 Proxy 像 Python 中的魔法函数，甚至也能跟 Python 中一样能对关键字的一些行为进行干预了。

这简直不要太简单，同一个例子，不仅代码量减少了，而且功能还增加了，我凸(艹皿艹 )！
