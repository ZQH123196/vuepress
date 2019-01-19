# VirtualDOM

虚拟 DOM 是指留还未被写入 html 页面的 DOM 节点。
真实 DOM 是指已经挂载到页面上的 DOM 节点。

虚拟 DOM 因为还未被挂载到页面上，所以不会存在任何浏览器重排（reflow）、重绘（repaint）等操作，所以相比真实 DOM 会快上很多。

> 真实 DOM 上 top 值的更改都会导致重绘制操作，如果在真实 DOM 上连续更改 top 之类的就会影响性能，除非你本身就是要动态的效果。


一个 DOM 其实是一个树状结构，其树上的各个节点也被称作 NODE 节点，比如 DOM 元素上会有 parentNODE 这个方法代表就是父级的 NODE 节点。

所以一个 DOM 树就是多个 node 节点的集合，或者将 node 节点比作叶子节点也行，这其实是一个概念......


## 思路

构建 Vnode 我们需要知道：
元素类型：type
元素属性：props
子元素集合：children

!(https://raw.githubusercontent.com/chalecao/virtualdom/master/chapter2/4.png)

```js
function vnode()
```

根据已有的结构生成 Vnodes 并将其构造为一个 VDOM 树。



注意要进行 string 类型的判断，因为 html 有很多文本。createTextNode







---

## draft

不完整实现
为什么，完整：
Vue 定义
React 定义

### 生成 VDOM

将 html 转化的方式：
自己做，说到底只是文本文件，可以直接用正则来撸。
用 html 解析器 - python 中的 beautifulsoup 4，node 
利用 jsx 格式 - React，Vue

要明白的是，我们必须处理转换出来的这种格式，所以选一个喜欢的就好。

将