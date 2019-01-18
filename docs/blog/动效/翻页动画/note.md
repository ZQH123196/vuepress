# 翻页动画

<Dynamic-EaseTurnBookPage/>

## 思路

维护一个代表右边页数的数值。

直接数数，从 1 数到最后一个页数，处于左边页的 z-index 全部赋值正数，处于右边页数的 zindex 全部赋值负数，这样就能保证 z-index 的顺序了。

例如：当前左边页面有三张，右边页面有四张，此时的 z-index 排列为：1 2 3 -4 -5 -6。此时，左面显示的会是 z-index===3 的页面，而右面显示的会是 z-index===-4 的页面。

正反面：这个非常简单，用 backface-visibility 来做，设置一页有两面，背面绕 Y 轴旋转 180°即可，backface-visibility。

由于旋转角度的一致，导致页面会发生层叠的效果，导致翻页时有点出漏子，可以设置除了两边最顶上那一页，其余的 Z 轴全部下降一度 1°。

## 源码

<<< docs/.vuepress/components/Dynamic/EaseTurnBookPage.vue

---

## 另一方法归档

**思路**：

人最多能看见三页，左边右边最上面的一页以及在翻页时候显示的第二页。人最少能看见一页，也就是右边那一页。

在翻页至少一页之后，能同时看见左右两页，即设置两个作为 top 的 z-index 值作为左右两边最上面的页。而在两个 top 之下的则是 second 页，这两个页面可以设置作为 second 的 z-index 值。

然后在自右向左翻页的情况下，右面的 top 将会被翻页到左面成为左面的 top，同时左面的原 top 页将会替换为 second 页，原左面 second 页取消 z-index 值。

**实现**：

维持两个栈结构，左栈和右栈，两个栈的 z-index 都是最上层最高，最下层最低，我们只需要设置最上面两层即可。

每次点击，我们只需要进行栈顶的移动，左栈顶移动到右栈顶，或者反过来。移动完之后确保栈顶的 z-index 值为 top，第二个为 second 即可。同时在栈顶移动过程中要将原先的 second 给移除。

**缺点**：因为并没有遵循现实中的规则，在后续开发比如 3D 旋转时可能会出大漏子，因为仅仅保证了左右两个页面最上层跟第二层的有序，其他的都是无序状态。

```vue
<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <div class="book">
      <div
        v-for="pageNumber of total"
        :key="pageNumber"
        :ref="pageNumber"
        @click.self="handleClick"
      >
        <h1>{{pageNumber}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: [1, 2, 3, 4],
      // 最左边为栈顶
      leftStack: [],
      rightStack: [1, 2, 3, 4],
      topIndex: 2,
      secondIndex: 1
    };
  },
  methods: {
    init() {
      const pageEl = this.$refs["wrapper"];
      pageEl.style["perspective"] = "800px";

      this.manageIndex();
    },
    handleClick(e) {
      // 向左向右是一个互斥状态。
      if (!e.target.classList.contains("turnPageLeftClass")) {
        this.turnPageLeft(e);
      } else {
        this.turnPageRight(e);
      }
      this.manageIndex();
    },
    turnPageLeft(e) {
      const el = e.target;
      el.classList.remove("turnPageRightClass");
      el.classList.add("turnPageLeftClass");
      // 左边入栈，右边出栈
      this.leftStack.unshift(this.rightStack.shift());
      if (this.leftStack.length >= 3) {
        // 清除原 leftStack second 的 z-index，此时已经发生栈顶移动，所以是第三个
        const third = this.leftStack[2];
        this.$refs[`${third}`][0].style["z-index"] = 0;
      }
    },
    turnPageRight(e) {
      const el = e.target;
      el.classList.remove("turnPageLeftClass");
      el.classList.add("turnPageRightClass");

      this.rightStack.unshift(this.leftStack.shift());
      if (this.rightStack.length >= 3) {
        const third = this.rightStack[2];
        this.$refs[`${third}`][0].style["z-index"] = 0;
      }
    },
    manageIndex() {
      if (this.leftStack.length >= 2) {
        const top = this.leftStack[0];
        const second = this.leftStack[1];

        this.$refs[`${top}`][0].style["z-index"] = this.topIndex;
        this.$refs[`${second}`][0].style["z-index"] = this.secondIndex;
      }
      if (this.rightStack.length >= 2) {
        const top = this.rightStack[0];
        const second = this.rightStack[1];
        this.$refs[`${top}`][0].style["z-index"] = this.topIndex;
        this.$refs[`${second}`][0].style["z-index"] = this.secondIndex;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  position: relative;
  width: 800px;
  height: 800px;
  transform-style: preserve-3d;
  color: white;

  .book {
    transform: rotateX(30deg);
    transform-style: preserve-3d;

    div {
      position: absolute;
      background-color: black;
      top: 200px;
      left: 300px;
      width: 250px;
      height: 400px;
      transform-origin: left center;
      backface-visibility: visible;
      text-align: center;
    }

    div:nth-child(1) {
      background-color: red;
    }

    div:nth-child(2) {
      background-color: green;
    }

    div:nth-child(3) {
      background-color: blue;
    }

    div:nth-child(4) {
      background-color: yellow;
    }

    .turnPageLeftClass {
      animation: turnPageLeft 3s;
      // 向前填充模式被保留。
      animation-fill-mode: forwards;
    }

    .turnPageRightClass {
      animation: turnPageRight 3s;
      animation-fill-mode: forwards;
    }

    @keyframes turnPageLeft {
      from {
        transform: rotateY(0deg);
      }

      to {
        transform: rotateY(-180deg);
      }
    }

    @keyframes turnPageRight {
      from {
        transform: rotateY(-180deg);
      }

      to {
        transform: rotateY(0deg);
      }
    }
  }
}
</style>

```