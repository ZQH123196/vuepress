自制 webserver-java



先实现基本功能，能处理 get、post 请求，能根据 url 返回首页，404，505。

get 无需处理请求内容

505 处理非 http1.1 的情况

对 request、response 进行解耦

对样例代码进行封装

使用配置文件更方便的进行配置，根据 url 调用不同的 servlet 进行服务

加入注解功能 

添加多线程支持，分发器





额外：

加入文件上传下载

加入长连接

加入 JSON 配置，根据 JSON 生成





第一步：希望输入网址，能够自动匹配到对应的 java 处理类。



<urls target="some.java">

<url>/aa/index</url>

<url>asd/asd</url>

<url>/bb/bb/bb</url>

</urls>





1. 解析配置文件，web.xml 或 web.json
2. 将 url pattern 跟对应的 java 类关联，用 Map<url, classname>



第二步：解析 http 协议

1. 创建 tcp socket 监听端口
2. 按 http 格式解析
3. 返回浏览器的请求





优化：

1. 基于时间戳收发数据，避免在同一时间段内被过度请求