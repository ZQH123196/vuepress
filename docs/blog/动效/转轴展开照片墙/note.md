# 转轴展开照片墙

<TurnImagesWalls/>

---

## 思路

布局：先用 flex 居中，然后 space-between。

自下而上的动画：直接用 transform: translateY(100%) 下放，然后依靠过渡来做。

放大缩小动画：同样利用过渡来做，单击图片放大时，其他未被单击的图片变小，并将 opacity 慢慢置 0。

关闭按钮：直接利用 before、after 画一个出来即可，然后在添一个 hover 旋转的效果。

过渡：transition 或 @keyframes 或 vue 的过渡语法，事实上我发现 vue 的过渡语法不仅更好写，也更易于维护，因为你知道所有的过渡就在那几个地方。

## 源码

<<< @/docs/.vuepress/components/TurnImagesWalls.vue