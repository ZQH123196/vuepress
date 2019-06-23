# axios







## 初始化 axios







## 拦截器

response 拦截器的返回值将作为 then 成功时传入的 res 值，可以用将默认的 response 参数给替换掉，因为原始的 res 要用 res.data 才能取到数据，所以可以用拦截器修改其返回值进行精简。



存入 token 信息，以前每次接收跟发送时都要对携带的 token 信息进行验证或是添加，这很麻烦，可以用拦截器提前进行统一的处理，这样处理的地方就位于一处便于修改和调试。





不同的baseurl我的项目里也有，每次调用axios时设置一个config参数就好了，不需要创建很多axios实例啊

function config() {

  const base = {

​    baseURL: baseURL

  };

}

forgotPassword(data) {

​    return axiosIns[.post](http://link.zhihu.com/?target=http%3A//instance.post)('/user/forgotPassword', data, config())

  },

  resetPassword(data) {

​    return axiosIns[.post](http://link.zhihu.com/?target=http%3A//instance.post)('/user/resetPassword', data, configOld())

  },

