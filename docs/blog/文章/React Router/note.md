# React Router 总结

route 采用一种包含的匹配关系，自上而下进行匹配，只要路径为路由的子集，那么就显示出来

可以使用 Switch 组件包裹来只选择一个匹配的路径，会选择第一个匹配的子集来显示，这时候还可以加上 exact={true} 或 exact(默认值就为 true) 来表明精确匹配，而不是用匹配子集的方式

重定向可以使用 Redirect 组件，自上而下的匹配，一个都没有命中的话，那么就走重定向的页面，拿来放置 404 之类的

跳转可以使用 Link 组件

在跳转时提供一个被选中的标识可以使用 NavLink，其实就是在被点击时加上一个 class=“active”，也可以自己在 Link 组件上写样式来实现这个功能，这个组件默认行为也是匹配所有子集路径



## 二级路由





## 动态路由

Router 提供的 H5 跳转

match 提供了匹配的信息，在里面可以取得传入的 id 值

传入动态数据，形如`:id`

to 的 state 属性可以用来传递数据，当然必须是通过点击路由的方式传递



## withRouter HOC 提供的方法

withRouter 提供路由的方法，使得组件获得操作 router 的功能，特别是函数组件

Route 组件也可以提供路由方法，但是 route 组件一般不用于导航展示型组件，而是用于导航容器型组件，这样会造成语义不明确。

Route 组件的渲染方式其实就是一个 HOC。



Route Components

当 route 匹配到 URL 时会渲染一个 route 的组件。路由会在渲染时将以下属性注入组件中：

#### `history`

Router 的 history [history](https://github.com/rackt/history/blob/master/docs)。

对于跳转很有用的 `this.props.history.pushState(state, path, query)`

#### `location`

当前的 [location](https://github.com/rackt/history/blob/master/docs/Location.md)。

#### `params`

URL 的动态段。

#### `route`

渲染组件的 route。

#### `routeParams`

`this.props.params` 是直接在组件中指定 route 的一个子集。例如，如果 route 的路径是 `users/:userId` 而 URL 是 `/users/123/portfolios/345`，那么 `this.props.routeParams` 会是 `{userId: '123'}`，并且 `this.props.params` 会是 `{userId: '123', portfolioId: 345}`。

#### `children`

匹配到子 route 的元素将被渲染。如果 route 有[已命名的组件](https://github.com/rackt/react-router/blob/master/docs/API.md#named-components)，那么此属性会是 undefined，并且可用的组件会被直接替换到 `this.props` 上。

You can get access to the [`history`](./history.md) object's properties and the closest [`<Route>`](./Route.md)'s [`match`](./match.md) via the `withRouter` higher-order component. `withRouter` will pass updated `match`, `location`, and `history` props to the wrapped component whenever it renders.

## 路由权限管理/路由守卫

react router 没有 vue router 自带的路由权限管理功能，需要自己实现一下，不过其实很简单，巧妙的利用 HOC 组件对传入的组件进行是否渲染的管理即可。

HOC 内只要判断一下是否登录，登录就渲染组件，不登录就返回一个要求登录页面即可，非登录状态可以用 Redirect 组件来做。

JSX 还真是神奇。



## 小技巧

render

component、children、render 差异

children 与 render，render 只有当路径匹配的时候才会渲染，而 children 属性直接将所有路由都渲染出来。

Route 组件不填写任意内容，相当于 Redirect 的功能，也类似于 switch 语句中的 default 功能，可以用来显示 404 页面。

不过还是推荐使用语义化更强的 Redirect。

