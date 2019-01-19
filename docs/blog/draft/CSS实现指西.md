# CSS实现

**一定要注意简写属性的重置效果**，先怼简写后怼展开式绝对没毛病，展开式也有简写？W3C......

海量采集自《CSS 揭秘》和网络

## 第2章 背景与边框

### 半透明边框

> [半透明边框](https://github.com/cssmagic/CSS-Secrets/issues/32)

结论先行：将元素的 background-clip 设置成 content-box 或 padding-box。

一上来就是这一段，而且真的无法实现半透明边框。
```css
border: 10px solid hsla(0,0%,100%,.5);
background: white;
```

这是 background-clip 默认属性的锅，因为其默认值为 border-box，这个值表现为背景**不超过边框但是在边框之内**。

因为背景的颜色延伸到了边框之下，所以导致了混色，背景的颜色会跟边框的颜色混合导致了半透明边框的失效（当然全透就不用说了）。

因此只需要参考下面：
```
background-clip: border-box 背景延伸到边框外沿（但是在边框之下，即不超过边框但是在边框之内）。
background-clip: padding-box 背景延伸到内边距外沿（同样在内边之下，同上）。
background-clip: content-box 背景裁剪到内容区 (content-box) 外沿（同上）。
background-clip: inherit
```
将 background-clip 的值改为 padding-box 或 content-box 即可喽。

### 灵活的背景定位

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)

需求：我们有时希望图片和容器的边角之间能留出一定的空隙。

在 [CSS 背景与边框(第三版)](http://w3.org/TR/css3-background)中,
background-position 属性已经得到扩展,它允许我们指定背景图片距离任
意角的偏移量,只要我们在偏移量前面指定关键字：top、bottom、left、right,这些关键字会以[background-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)（默认 padding-box）为参考。

```css
background: url(xxx.img) no-repeat #58a;
background-position: right 20px bottom 10px;
```
> 背景图片跟右边缘保持 20px 的偏移量,同时跟底边保持 10px 的偏移量。
>> 我们也可以通过将图片放置到一个 div 中通过 position: absolute 来实现这个功能，不过问题是，这会增加 CSS 代码量和 DOM 元素的数量。所以尽量使用背景定位吧。

