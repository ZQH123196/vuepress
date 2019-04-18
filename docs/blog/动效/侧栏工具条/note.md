# 侧栏工具条

[[ toc ]]

## 利用 CSS 雪碧图的方法一次性引入

<Dynamic-Toolbar-demo1/>

精灵图使用的关键点在于将显示的元素当作一种透镜来使用，每一个元素都有一个宽高，这个宽高就相当于透镜的宽高，其余部分由于设置 cover 的原因会自动隐藏掉，这样就形成了透镜的效果。

这样将所有的小图片都拼接到一张图片之后，每个元素通过设置自己的透镜大小和透镜的位置 background-position 就可以动态的修改显示的位置了。

每一个元素具有两种状态，一种未 hover，一种已被 hover，hover 时将会改变状态并显示提示信息或图片。

对于特别显示的信息，比如二维码之类，可以用 transform 的 scale 在将其隐藏掉，在更改变换位置 transform-origin 为左下角，然后在用 opacity=0 将其藏起来，这样这个元素就相当于被父元素装配了一样。

优缺点：
1. HTTP 请求减少，十分容易
2. 因为主要用了图片位置变化，其兼容性佳，能兼容至 ie6
3. 不利于修改

> 也可以采用更加简单的引入图标的方式来制作。

对应的精灵图：

![toolbar](/images/toolbar.png)

对应代码：

<<< docs/.vuepress/components/Dynamic/Toolbar/demo1.vue




