用 animation 配合 @keyframes 而不是 transition：
1. 在调试时会带来很多麻烦。惯常书写的 `transition: all 1s;` 这里面的 all 就非常坑，语义及其不明确，并且可能带来隐患，比如本来不希望有过渡过程的属性改变，现在也会被 all 给捕获到。而 animation 有着对应的 @keyframe 名称，一看就知道，语义清晰。
2. 难扩展，transition 可以看做某种意义上的二帧动画，如果突然想将动效扩展就会麻烦。而 @keyframe 要扩展实在是非常简单。