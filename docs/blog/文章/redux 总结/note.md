# redux 总结

只有 store 能改变自己的内容，不是 reducer 并不改变 自变量。

reducer 必须是纯函数，注意，如果因变量依赖了了 new Date() 这就不是纯函数了，因为给定相同的自变量，却会随着事件产生不同的因变量。异步也是如此，因为异步并不一定能成功，所以给定自变量可能会产生不同的因变量。



解决的痛点：

成长的项目中会有越来越多的 state，这些问题大多来源于 data 对象本身是可变的数据（mutation）和异步的（asynchronicity）这两个问题，redux 就是为了处理这些而出现。



1. 如何让数据具有不可变性呢？

Redux 中是依靠纯函数（pure function）的概念来保证每次的 state 都是原始 state 的一个快照。

2. 如何更好的管理异步呢？

使用



数据管理库，redux 跟 vuex 的不同点在于，redux 不像 vuex 那样跟 Vue 框架紧耦合，其本身可以被其他框架所使用，是一个通用的状态管理库。

> 在 Vue 里面也可以用 redux。



## 使用 combineReducers 进行数据的拆分管理



## 异步操作

一个关键问题没有解决：异步操作怎么办？Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。

怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）。



## immutable.js

其 set 将返回一个全新的对象。



redux-immutable，其提供了一个 combineReducers，这个函数所提供的 state 就是 immutable 对象。



https://segmentfault.com/a/1190000013088373



要注意的是 toJS 的操作，将会大量耗费性能。

fromJS()

Deeply converts plain JS objects and arrays to Immutable Maps and Lists.

fromJS 的时候会将其内部的包括函数、对象都转换为 immutable 对象，所以在使用 set 的时候要注意将值用 fromJS 转换之后在传入。



什么是纯函数？纯函数就是纯粹的函数，是真正意义上的函数，即输出仅受到输入影响的函数，不会出现任何副作用。

> 我们常常会在函数中以非输入参数来更改我们的输出值，或者是直接修改了输入的参数，这些都是带副作用的函数，太慢就不是纯函数。

这就是为什么我们在 reducer 中每次都要返回一个新的数据对象，而不能是直接赋值，就是为了保持不可变性，你不能修改输入参数，且必须保证输出值仅收到输入参数的影响。

> 其实输入参数就是数学函数中的自变量，而输出值就是数学函数中的因变量。



原生的数据传递，一般是使用 context API 将父组件包装成  Provider 然后子组件使用 Comsumer 组件来接收父组件传递的值。



行为 action 描述你要对数据做的事，然后用 dispatch 发送给 reducer 管理员，reducer 管理就会将一个应用了 action 的新数据放到 store 中。



store.subscribe 函数用于订阅 store 中的某些内容，如果数据发送了修改就会调用 subscribe 的内容。其实就是发布-订阅的机制



可以使用 store.getState 函数来获取 store 中的目录，相当于便利店的传单，但是你不能修改里面的东西，是只读的，要用 action 作为订单列表，dispatch 发送给 reducer 管理员才能进行修改。



我们要编写 reducer 的处理，其返回一个全新的对象，注意必须是全新的对象，然后这个新的对象将会作为 store 的新值。

只有一个单一的 store 和一个根级的 reduce 函数（reducer）。随着应用不断变大，你应该把根级的 reducer 拆成多个小的 reducers，分别独立地操作 state 树的不同部分，而不是添加新的 stores。这就像一个 React 应用只有一个根级的组件，这个根组件又由很多小组件构成。



我们可以分别对应不同的功能书写单独的 reducer，最后在用 redux 提供的 combineReducers 来混合各个小的 reducer



## react-redux

redux 单独使用的步骤繁琐，至少需要 5 步：引入 redux --> 获取 store.getState() --> 编写 action --> dispatch action --> 订阅 store.sbuscribe(fn)



我的天，真滴麻烦，是真滴麻烦！



react-redux 提供了一个有趣的 connect(fn, fn)(C) 函数

react-redux 的步骤：引入 react-redux

redux 提供了一个便捷绑定 action 的函数 bindActionCreators({actionFn1, actionFn2}, dispatch)

> redux 处书写

react-redux 则是 react 下 redux 的精简化，如果在第二个参数放置 actions 的对象字面量，其会自动的调用 bindActionCreators 函数，自动的进行一个 dispatch 的绑定。



好处？

将 store 映射到了 props，这就代表我们其实已经不需要有状态的类组件了（除非我们需要生命周期函数），这时候我们就可以将组件变成性能更高的函数组件。

而且，我们也不用在 store.subscribe(this.setState(store.getState())) 中去订阅了，因为当 store 发生改变将会触发 mapStateToProps 然后 Props 被赋值将会自动引发重新渲染。

> state 和 props 发生改变都会导致重新渲染

## redux 中间件

原生只能处理简单对象

redux-thunk 可以提供处理函数对象的能力，用于处理内部的异步操作

redux-promise 可以提供处理 promise 对象的能力，也是处理异步操作

redux-logger 可以打印仓库日志



## redux-saga

redux-thunk 是放到 action 中去处理，而 saga 则抽离出来作为一个单独的 js 文件进行处理，管理异步操作会比较方便。





## 小技巧

抽取 type 字符串值为变量，因为字符串写错了是不会报错的，如果不小心在某个地方拼写错误，导致 switch 语句没有匹配到，你是很难察觉到的，因为 reducer type 匹配不中最后将会返回原本的 state，也就是说没有更新。

拼写错误导致的 store 未更新，可以将所有 type 字符串提取到一个公用文件中去，需要使用就引入这个文件夹就行了，因为变量拼写错误是会报错的，这样就规避了一些风险。



## 参考



* [redux 文档](https://www.redux.org.cn/)

* [Redux的前世-今生-来世](https://juejin.im/post/5ac451b06fb9a028c368ff9c)