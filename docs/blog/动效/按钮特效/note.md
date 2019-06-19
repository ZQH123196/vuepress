# 按钮特效

<p class="codepen" data-height="482" data-theme-id="0" data-default-tab="result" data-user="ZhengQiHua" data-slug-hash="ewZNOX" style="height: 482px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="buttonHover">
  <span>See the Pen <a href="https://codepen.io/ZhengQiHua/pen/ewZNOX/">
  buttonHover</a> by 郑启华 (<a href="https://codepen.io/ZhengQiHua">@ZhengQiHua</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 思路

<!-- TODO：将 4 行单独抽离，分别写，每行可以做本质相同表现不同的特效 -->

首先，做这些按钮，最好先设置 box-sizing 为 border-box，因为默认的 conten-box 不计入边框的大小，做起来会很麻烦。

第一行特效，边框旋转：
1. 首先做成有虚线边框的图案，用 border: 4px dashed; 可以做出虚线的边框。
2. 考虑只有边框旋转，而图标本身不旋转，所以边框跟图标必定是分离开的，不能是一个元素，否则就一起旋转了。
3. 用伪元素 ::after 来做边框，然后单独旋转这个伪元素，并将图标元素的背景色调好即可。
4. 旋转伪元素可以用帧动画 @keyframes 和 animation 来做，将 rotate(0deg) 转到 rotate(360deg)，然后设置时间函数为 infinite。

第二行特效，图标旋转：
1. 图标转，而边框其实转不转都可以，因为是实线边框，看不出来边框旋转的。
2. 但是为了便于改动，最好是假定图标转，而边框不转，那么图标跟边框依旧是分开的。
3. 接着用帧动画或者 transition 来旋转图标元素即可。

第三行特效，背景内陷：
1. 核心其实只是在于背景色的放大和缩小罢了，图标跟背景其实是分开的。
2. 先将图标的背景变成跟外部背景色一样，再将将图标和边框变为白色，最后再用一个伪元素图标内的背景色将由伪元素提供。此时本体背景色跟外部一样，相当于没有，么图标内的背景色将由 after 提供，所以可以随意的缩小背景而不影响主体。最后再将图标单独的显示出来，用 z-index 来显示在最上层。
> 此时层级自上而下为：图标伪元素 > 伪元素 after > 图标背景元素 > 外部背景元素。
>> 注意，图标伪元素跟图标背景元素是不同的元素。
3. 然后收缩伪元素，伪元素收缩之后会露出底下的背景色，注意此时图标元素的边框并没有变化，就达到了背景内陷的效果。
4. 收缩的动画用 transition 做。
> font awesome 图标库对于使用 class 的方式，是用过伪元素 ::before 来将图标绘制出来的，因此真正的图标元素是 ::before。

第四行特效，色彩淡出：
1. 还是伪元素做背景色，然后伪元素渐渐消失露出底下的背景色，唯一不同的就是要慢慢的变大，慢慢的变透明，以达到放大淡出的效果。
2. 像是这种淡入淡出，都必定需要 opacity + transition 来做，至于放大可以使用 transform: scale(1.3); 来做。
