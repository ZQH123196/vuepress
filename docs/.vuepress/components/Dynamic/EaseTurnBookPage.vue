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
