# 搜索框

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="ZhengQiHua" data-slug-hash="BgjXew" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="searchBar">
  <span>See the Pen <a href="https://codepen.io/ZhengQiHua/pen/BgjXew/">
  searchBar</a> by 郑启华 (<a href="https://codepen.io/ZhengQiHua">@ZhengQiHua</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 思路

默认搜索框 width 为 0，这样就隐藏掉了，然后当 hover 时就增加其长度，变长的过程用 transition 来放慢一下，就变成了动画效果。

然后在放大的区域中加点屏幕适应，否则太小的屏幕会导致空间不足，引发 overflow，默认会将多余的内容放到下面，这里会将按钮给挤到下面去。