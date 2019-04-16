# Koa2

参考：
* [Koa 官网](https://koa.bootcss.com/)
* [koa-generator 脚手架](https://github.com/17koa/koa-generator)


## 使用脚手架
```bash
sudo npm i -g koa-generator
koa2 -e koa2-learn && cd koa2-learn
```
> 默认使用的是 jade 模板引擎，用 -e 选项换成 ejs。

将脚手架中 ejs 的版本改为 "^2.5.5"，因为 yarn 有提示有 bug 在 2.5.5 版本中进行修复：
`yarn install`


根据 package.json 中的脚本指令运行：

`yarn dev`

访问 localhost:3000 查看。

> 注意：端口信息在 `/bin/www` 文件中，修改端口去该文件中修改。

## 上下文信息 ctx

每个中间件都默认创建了一个 ctx

ctx 可以说是我见过抽象度最高的玩意，俗称上下文信息，以前写代码的时候都是极力的避免过高的封装，力求每个函数的入口就能看出所有引入的信息，而现在这个 ctx 反其道而行：**你必须查看调用时传入的东西是什么，而不能一眼就从函数参数就看出传入了什么**。

这种含有高度不言而喻意味的对象，必须有极其明确的文档来说明，否则就是盲人摸象。类似于约定大于配置，也就是在敲代码前，默认大家都明白 ctx 上下文都有些什么。



## 中间件

当然外部网络访问进来时，在代码顺序中的表现为自上而下的运行，就像是剥皮一样，一层一层的拨开外部请求的外壳，其实就跟底层网络的实现原理一样一样的，可以理解为一层层的解码直到我们需要的地方。
解码之后，决定要返回一个响应结果时，在代码顺序的表现为自内而外的运行，也就是跟进入时逆向的的顺序，这也跟网络返回结果时被一层层的封装类似。

或者从表现上来说跟“上下楼”一样，我上来的时候经过 b 层，那我出去的时候也会经过 b 层，我不能跳楼！比如有 abc 三层，进入（上去）时的顺序为:a->b->c，那么出去（下去）时的顺序为: c->b->a。
> 决定这种进出顺序的是 koa.use() 函数，其调用顺序就是进入顺序。

这种运行机制，也跟递归很相似，同样有一个的调用链，个人感觉 koa 就是用协程来模仿了递归调用，但比递归高级的是，递归的函数可以不一样，而是可以自己定制。
> 恩，我觉得 Python 应该也有类似的框架才对，因为这些异步协程在 Python 中大量应用了。

```bash
mkdir middleware &&cd middleware
touch　koa-test1.js
touch　koa-test2.js
touch　koa-test3.js
```

在启动文件中引入:
```js
const test1 = require("./middleware/koa-test1")
const test2 = require("./middleware/koa-test2")
const test3 = require("./middleware/koa-test3")

app.use(test1())
app.use(test2())
app.use(test3())
```

往　koa-test1.js 中写入:
```js
module.exports = function () {
	return async function (ctx, next) {
		console.log("enter test1");
		await next() // 运行完毕，移交下一个中间件
		console.log("leave test1");
	}
}
```
> koa-test2.js、koa-test3.js 中写入类似的代码，但是 test1 改为对应的 test2、test3。

运行 `yarn dev`,访问 http://localhost:3000/，其结果为：
```bash
enter test1
enter test2
enter test3
  <-- GET /stylesheets/style.css
leave test3
leave test2
leave test1
  --> GET /stylesheets/style.css 200 10ms 111b
```

为什么 test1 导出一个函数？

答：因为导出的外层是 app.use(test1())，以函数的方式调用。

进出都会走到同一层，这有什么好处？

答：进入时进行了修改，可以在出去时进行验证。比如在　enter test1 中进行设置，在出去时在 leave test1 中进行验证，这样能避免设置被 test2、test3 修改掉。

什么决定了进出顺序？

答：koa.use() 的调用顺序决定了进入顺序。

其实现原理？

答：利用协程（生成器）可以做。


## 路由

此处 koa 的路由是传统意义上的路由，也就是多页应用的路由，即每次都需要客户机发送一个 http 请求，然后后端返回一个对应请求的网页。

koa 的路由十分简单，设置好之后就直接使用

脚手架已经自带路由配置，
这是`./routes/index.js`文件:
```js
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', { // 此处将 / 挂到 index.ejs
    title: 'Hello Koa 2!'
  })
})

// 略

module.exports = router
```

此处为挂载的 `.views/index.ejs`:
```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
  </body>
</html>
```

这是`./routes/users.js`文件:
```js
const router = require('koa-router')()

router.prefix('/users') // 这是前缀，在设置了 prefix 下建立的所有路由路径，都要加上这个前缀

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
```
> 注意前缀

在入口文件 app.js 中引入路由：
```js
const index = require('./routes/index')
const users = require('./routes/users')

app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
```

> 这里的 allowedMethods() 很关键，根据你在实现中挂载的方法，在，koa 会自动设置一些 Header 让未实现的方法自动返回错误码，即只允许客户端请求你实现了的方法。客户端访问那些禁止的方法则返回 405 或实现不适当的 501 状态码，比如只实现了 post 方法，这时候客户端发起 get 请求就会出错。

运行并访问`http://localhost:3000/users/`，可以访问到 ./routes/users.js 文件下的路由。

路由的最终值由什么决定？
答：router.prefix + method("path", callback)，这里的 method 可能是 get、post、etc.

路由显示的页面由什么决定？
答：如果有挂载模板引擎，就由模板决定，否则就是空页面，除非自己添加内容。

## cookie

cookie 总是被封装的很好，只需要明白 cookies 的 set 和 get 接口即可。
::: tip
ctx.cookies.set(name, value, [options])

通过 options 设置 cookie name 的 value :

* maxAge 一个数字表示从 Date.now() 得到的毫秒数
* signed cookie 签名值
* expires cookie 过期的 Date
* path cookie 路径, 默认是'/'
* domain cookie 域名
* secure 安全 cookie
* httpOnly 服务器可访问 cookie, 默认是 true
* overwrite 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是*false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路*或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。

ctx.cookies.get(name, [options])

通过 options 获取 cookie name 时:
* signed 所请求的cookie应该被签名



在设置 `./routes/index.js` 的路由中设置 cookie:
```js
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.cookies.set('id', Math.random()) // 每次访问此路由随机设置一个 cookie
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/json', async (ctx, next) => { // 访问此路径查看之前设置的名为 id 的 cookie
  ctx.body = {
    title: "123",
    cookie: ctx.cookies.get('id')
  }
})

module.exports = router
```

