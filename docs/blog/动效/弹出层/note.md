# 弹出层

## 思路：

很简单，就是多加一层布，这层布需要跟屏幕一样大。

弹出层的目的是为了造成凸显的效果，比如凸显登录框其他的都要相对暗淡。

弹出层正是一个夹心层，对下进行遮蔽，对上进行凸显。即需要凸显的东西位于第一层(index=3)，夹心层位于第二层(index=2)，剩下不需要凸显的东西全部位于最三层(index=3)。

让弹出层消失可以使用删除掉或使用 CSS 的 display、opacity。

注意：z-index 在相同层级的 position 中生效。

<Mask-Layer/>

## 源码

<<< docs/.vuepress/components/MaskLayer.vue