# 进度条

<p class="codepen" data-height="317" data-theme-id="0" data-default-tab="result" data-user="ZhengQiHua" data-slug-hash="WqrWVJ" style="height: 317px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="progressBar">
  <span>See the Pen <a href="https://codepen.io/ZhengQiHua/pen/WqrWVJ/">
  progressBar</a> by 郑启华 (<a href="https://codepen.io/ZhengQiHua">@ZhengQiHua</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 思路

实现进度条的核心在于如何让进度条随时间拉长。

1. 假设某个元素当有这样一个性质：随着某个值的更改而不断的拉长自己。

2. 那么 JS 就可以通过修改这个元素的 CSS 样式来达到不断拉长这个元素的目的。

3. 这个元素随着时间的推移而不断拉长自己，其表现形式就是进度条。

拉长一个元素有很多的选择，最简便的做法是：随着时间的流逝自身的宽度被不断拉长。

**所以，有一个带颜色的标签 T，用 JS 控制其随着时间的流逝不断更改 T 的宽度值，产生的效果就是 T 元素随着时间的过渡而不断增长，外在形式就是一个进度条了。**

> 好看的色彩：用 CSS3 的渐变色属性 linear-gradient 来做就可以了。
>
> 好看的形状：用 border 或是 shadow 来做就可以了。


更进一步，我们也可以使用 CSS3 的变量来实现这种动态效果：


## 参考
* 