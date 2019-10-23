# react



何时渲染？

当 state 或 props 发生改变，render 重新执行。

当父组件重新渲染，子组件也将重新渲染。





关于 key 值，选择自变量，而不要选择因变量，比如 index 就是随着数组的改变而改变的，就不能使用 index 作为 key。



## redux 中间件的原理

改装 dispatch





action 跟 store 之间的中间件，action 跟 store 沟通的桥梁就是 dispatch。



你会发现 redux-thunk 可以传入一个函数，为什么？

因为 action 在走到 store 之前会经过中间件，中间件将 action 对象进行了处理



redux-thunk 的源码，是的，只有十四行，就是包装包装dispatch......

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```



如果你使用过 [Express](http://expressjs.com/) 或者 [Koa](http://koajs.com/) 等服务端框架, 那么应该对 *middleware*  的概念不会陌生。 在这类框架中，middleware 是指可以被嵌入在框架接收请求到产生响应过程之中的代码。例如，Express 或者 Koa  的 middleware 可以完成添加 CORS headers、记录日志、内容压缩等工作。middleware  最优秀的特性就是可以被链式组合。你可以在一个项目中使用多个独立的第三方 middleware。

相对于 Express 或者 Koa 的 middleware，Redux middleware 被用于解决不同的问题，但其中的概念是类似的。**它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。** 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。



将数据统一放到 redux 中管理，而不要只是把共享数据放在 redux 中。

原因很简单，不要从优化性能、节约资源方面考虑，而是要从人本身出发，要节约人的时间。

如果 state、props、redux 都用于存储数据，那么出现 bug 时，这三个地方都有可能出现问题。

如果有新人加入项目，面对一个数据存储区域跟面对三个数据存储区域，肯定是前者更容易理解。

如果原本存储于 state 的数据随着 APP 的开发要被其他组件使用，就要开始将 state 中的数据迁移到 redux，这会增加工作量。



pureComponent 自带了 shouldPudate，它会自动进行浅比较，如果没变，就不更新了。



vue 的 .vue 文件是借助 vue-loader 完成代码转换的，依托于 webpack

而 react 的 jsx 语法则是借助 babel 的 preset-react 完成转换的



setState 之后发生了什么？

```js
this.setState((prevState) => ({
    name: prevState + 1
}))
```

永远用一个函数返回一个对象的方法，因为 setState 是异步的，注意返回一个对象。



很多设置状态的函数都是异步的，如果同步执行只能获得“未被更新的值”。

如果是在 react 中，可以用 setState 的第二个参数来获得“已被更新的值”。

```
this.setState((prevState) => {
    age: prevState.age + 1
}, () => {
console.log(age)
})
console.log(age)
```

其实就相当于将后面的参数注册进行回调之中去。

在 Vue 中，可以用 nextTick 来获得“已被更新的值”





refs 的作用，什么场景用过 refs

获取元素的宽高时要用，做一个放大镜功能时，必须要获取图片宽高啥的，就一定要获取 DOM 了。





不要在任何可能会被销毁的组件上绑定 document.body 的任何事件，参考下面代码：

```jsx
class Demo extend React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0;
        }
    }
    
    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.setState(() => {
                top: document.body.scrollTop
            })
        })
    }
}
```

当路由跳转后，组件就被销毁，但是监听的事件依旧存在于 document.body 上，它依旧在不断的调用回调函数，问题在于，回调函数所绑定的 this 已经被销毁了，里面的 this 依旧不存在了，会不断的报错。



正确的做法是：

```jsx
class Demo extend React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0;
        }
        this.handleScroll = this.handleScroll.bind(this);//?
    }
    handleScroll() {
        this.setState(() => {
            top: document.body.scrollTop
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
```

先保存住 this 对象，然后销毁。

在组件销毁的时候，一定记得把一切注册的事件给销毁掉，特别是全局的事件。





ref 是一个函数有什么好处？

ref 的使用：

```jsx
class Demo extends Component {
    componentDidMount() {
        console.log(this.el)
    }
    
    render() {
        return <div ref={(dom) => { this.el = dom}}> div</div>
    }
}
```

或者

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```



这样使用，可以方便 react 在组件销毁后清空 ref 上面绑定的事件，因为被挂载到这个组件（this.el）上了...

不要用字符串形式的 ref。





高阶组件地狱

越用越多！

可以用 hook 来解决





受控组件和非受控组件的区别？



原本是面向生命周期编程，因为是类组件，而函数式组件有了 hook 之后就变成了面向问题编程。

`React.memo()`是一个高阶函数，它与 [`React.PureComponent`](https://reactjs.org/docs/react-api.html#reactpurecomponent)类似，但是一个函数组件而非一个类。

React.memo()可接受2个参数，第一个参数为纯函数的组件，第二个参数用于对比props控制是否刷新，与[`shouldComponentUpdate()`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)功能类似。





如何避免 ajax 重复获取？因为你访问过一个组件，离开后就销毁掉，再回来时是不是又要重新 ajax 请求了。

可以使用浏览器缓存 localStorege 或 sessionStorege 来持久化数据，不要将数据存在组件的 state 里面

最好的做法应该是存放到 redux 里面去。



react-router4 跟 3 的差别是什么？



react-router 3 跟 vuex 都是基于一个配置的理念去做的

而 react-router 4 则是将路由变成了组件，变成了 <link></link>、<Route></Route>

现在就变得很灵活，到处都能用。

从配置式变成了组件式。



reselect 就相当于计算属性，会依赖自变量而自动重新求值。跟计算属性一样有缓存，提升性能的作用。



hashHistore 跟 browserHistore 的差别？

使用 hashHistory，浏览器上看到的 url 会是这样的: /#/user/haishanh?_k=adseis
使用 browserHistory，浏览器上看到的 url 会是这样的：/user/haishanh
看起来当然
browserHistory 很好很理想，但 browserHistory 需要 server 端支持。 
而使用hashHistory的时候，因为 url 中 # 符号的存在，从 /#/ 到 /#/user/haishanh 浏览器并不会去发送一次 
request，react-router 自己根据 url 去 render 相应的模块。
而使用 browserHistory 
的时候，浏览器从 / 到 /user/haishanh 是会向 server 发送 request 的。所以 server 
端是要做特殊配置的。比如用的 express 的话，你需要 handle 所有的路由 app.get('*', (req, res) =>
{ ... })，使用了 nginx 的话，nginx也要做相应的配置。 具体见这里36，还有这个例子23。
所以你的 App 是静态，没有服务端的话，只能用 hashHistory。



推荐优选 hashHistore，虽然 browserHistore 很漂亮，但是需要后端的支持。





什么情况下使用异步组件（路由懒加载）？

库比较大的时候，首屏做到500kb才利于用户体验，最大不要超过1兆

https://www.jianshu.com/p/a55023ec6a94

react-loadable 库



不要在页面事件上绑定 bind，在 constructor 中绑定，因为这样更节约性能，否则就要在运行时运行一次 bind 了。



传递函数给子组件时要注意先绑定父组件的 this，否则在子组件内 this.props 调用时，其实在作用域链上是找不到自己的，如果恰好有同名的或许可以，但这样调用的就不是父组件的函数了，这就成 bug 了。