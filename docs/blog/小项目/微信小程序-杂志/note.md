

列表循环



数据请求：加载框



下拉刷新，无限滚动/加载

模态框：回调

交互：showActionSheet

转发：buttton **open-type** https://developers.weixin.qq.com/miniprogram/dev/component/button.html



点赞与数据缓存：正常数据是存放在服务器后台的，不过微信也提供了一个本地数据缓存的方法。这可以保留用户的点赞状态，但是这些数据其实应该被存放在数据库，这其实一般是用于存放一些临时数据，没有同步意义的那种，即使用户换手机也无伤大雅，而点赞这个最好不要这么去做。

setStorage

模板渲染与路由跳转：

wx.navigateTo("")























路由跳转



位置

微信计步：https://developers.weixin.qq.com/miniprogram/dev/api/wx.getWeRunData.html

电话：https://developers.weixin.qq.com/miniprogram/dev/api/wx.makePhoneCall.html

扫码

振动