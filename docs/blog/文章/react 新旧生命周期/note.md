# react 新旧生命周期

16.3 移除了三个生命周期函数，移除了三个带 Will 的函数~

React 的 16.3 版本中对生命周期进行了较大的调整，这是为了开发者能正确地使用生命周期，避免误解其概念而造成反模式。

componentWillMount 已被 16.3 给移除，因为在此处进行 Ajax 请求可能会与 react native 这些技术产生冲突，而且最重要的是这些 Ajax 请求完全可以放在 constructor 生命周期中进行请求。

componentWillReceiverProps 已被 16.3 给移除，因为官方认为在此处进行 Ajax 跟 setState 是不合理的。官方觉得我们会滥用这个生命周期函数，就移除掉了，因为限制比自由更珍贵吧。

componentWillReceiverProps 已被 16.3 给移除，理由也是官方认为这个东西没啥用还让人容易滥用，并且功能跟其他函数重叠。



> 16.x 的版本中为了兼容性依旧可以使用这三个生命周期函数，但是 17.x 以上的版本就用不得了。



---



根据生命周期图会发现，render 函数是不能使用 setState 函数的，因为根据资源的引用链这将会触发资源竞争导致死锁。

render 跟 componentWillUpdate 使用 setState 导致 state 更改 -> 触发 shouldComponentUpdate 返回 true 的话 -> 触发 componentWillUpdate -> 再次触发 render 然后有 setState 再次从头开始跑，知道堆栈溢出



事实上作死的尝试之后 react 会报一个很友好的错误，提示这将是 setState 错误使用的问题，让你修改。



在 componentDidMount 中使用 Ajax 请求是最好的选择，因为在运行前的路线上，componentDidMount 只会运行一次。

用 componentDidUpdate 来进行初始化之后的 Ajax 请求，此函数提供了参数 prevProps 或 prevState，用于比较上一次更新的值和现更新的值，如果值一样就没有必要请求接口了，以 prevState 为例

```js
if (this.state.xxx !== prevState.xxx) {
	this.fetchData(this.state.xxx); //  异步请求
}
```

这样就可以在 componentDidUpdate 中根据需求阻止循环渲染，可以快乐 Ajax 了。





在 shouldComponentUpdate 中将影响性能的赋值给拦截住，因为 react 不太智能，在面对这种情况时也会不断的触发更新，因此 shouldComponentUpdate 可以根据需求用来优化性能

```js
this.setState({
    count: this.count + 0
})
```



---



新生命周期进行了精简，将功能重叠的部分抽象出来，移除了三个生命周期函数，增添了两个生命周期函数

```
static getDerivedStateFromProps(props, state)
static getSnapShotBeforeUpdate(prevProps, preState)
```



getDerivedStateFromProps 的出现是因为人们喜欢在 componentWillReceiverProps 进行初始化，但是官方并不推荐这么去做。但是这种初始化和更新的场景非常多，因此官方设计 getDerivedStateFromProps  的返回值将直接放在 state 中，并且 getDerivedStateFromProps   将在初始化挂载时就会被运行。

但是，要注意的是他在组件运行之后运行的流程，这表明在组件运行阶段进行的 setSate 将会被 getDerivedStateFromProps 的返回值所覆盖！

```js

```

所以如无必要，

componentWillReceiverProps 初始化挂载时不会运行，getDerivedStateFromProps  初始化挂载时会运行。















getSnapShotBeforeUpdate 相当于 WillUpdate、WillMount 的替代品，不过名字变得更有意义，获取更新前的一个快照，这样就可以在更新前进行处理了，同样要注意不能循环依赖

getSnapShotBeforeUpdate 跟 componentDidUpdate 是一对，要同时出现，

getSnapShotBeforeUpdate 返回的值将会传递给 componentDidUpdate



```js
componentDidUpdate(prevProps, prevState, snapshot)
```

注意，新生命周期中的 componentDidUpdate 多了第三个参数，第三个参数就是 getSnapShotBeforeUpdate  所返回的值。