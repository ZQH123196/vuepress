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
      total: [1, 2, 3, 4, 5, 6],
      rightPageNumber: 0,
    };
  },
  methods: {
    init() {
      const pageEl = this.$refs["wrapper"];
      pageEl.style["perspective"] = "800px";
      
      // 初始化右页面数
      this.rightPageNumber = this.total.length;

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

      this.rightPageNumber--;
    },
    turnPageRight(e) {
      const el = e.target;
      el.classList.remove("turnPageLeftClass");
      el.classList.add("turnPageRightClass");

      this.rightPageNumber++;
    },
    manageIndex() {
      const totalLength = this.total.length;
      const leftLength = totalLength - this.rightPageNumber;
      for (let i = 1; i <= totalLength; i++) {
        let el = this.$refs[`${i}`][0];
        if (i <= leftLength) {
          el.style["z-index"] = i;
        } else {
          el.style["z-index"] = -i;
        }
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
