# Koa2实现JSONP跨域

参考：

* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

JSONP(JSON with Padding) ，这其实就是利用<script>标签没有跨域限制的**漏洞**来达到与第三方通讯的目的。因为根据同源策略的理想情况，<script> 标签也是不应该能被跨域获取的，。

怎么说呢，其实就相当于通过 js 代码的形式先在后端存放数据，比如后端写一个 js 文件 jsonp.js 内容为 `name: "eor"`，然后在前端引入这个文件 `<script scr="http//host/jsonp.js"/>`，然后页面会自动运行这段 js 此时全局对象上不就多了个 name 属性了么。

同时，后端别忘了给响应头添加`Content-Type=text/javascript`。

> 当然，放到全局变量上是不好，应当通过函数或挂载到对象的方式来传递数据。

在进一步，jsonp 也可以异步的获取数据，最直观的解决方式就是操作 DOM 创建一个 script 标签，然后给 script 标签的 src 上写入要请求的 URL 在带上要请求的数据即可。后端获取到了前端的 get 请求，也就是 script 标签，解析其携带的参数，后端返回内涵数据的一个 js 文件回去给前端，最后前端执行后端响应回来的 js 文件，搞定。

> script 标签本身是一个 get 请求，可以一些参数。



1、一个众所周知的问题，Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准；

2、不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如<script>、<img>、<iframe>）；

3、于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理；

4、恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；

5、这样子解决方案就呼之欲出了，web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。

6、客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。

7、为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

**“我想要一段调用XXX函数的js代码，请你返回给我”**

对于客户端而言，只是运行了一段 js 代码，虽然是远程获取之后运行的。

对于浏览器的 xhr API 而言，它不管任何 script 标签的 get 请求与响应，所以不会触发同源策略。

对于服务器而言，只是返回给前端一份 js 代码的字符串，因返回的类型是 type： text/javascript。



## 第一，浏览器只是运行一段代码

浏览器会不管不顾的同步运行 script 标签内的代码，因为资源的请求是交给 xhr 来管理的，而 script 标签的 get 请求能够通过 xhr 的安全监测--同源策略：

新建一个 index.html 写入：

```js
<html lang="en">
<body></body>
<script src="http://localhost:10086/getJS_and_run" type="text/javascript"></script>
</html>
```

再新建一个 index.js

```js
const Koa = require("koa")

const app = new Koa();

app.use((ctx) => {
	if (ctx.method !== "GET") return;
	ctx.type = 'text/javascript'
	switch (ctx.request.url) {
		case "/getJS_and_run":
			ctx.body = "alert('运行了服务器返回的 js 文本')";
			break;
		default:
			ctx.body = "none"
			break;
	}
})

const port = 10086;
app.listen(port, (err) => {
	console.log(`listen in http://localhost:${port}/`)
})
```

第一，证明只是运行一段代码

第二，简单的获取数据

第三，动态的获取数据