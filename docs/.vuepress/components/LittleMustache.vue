<template>
  <div class="mustache">
    <div class="leftRound">
      <div class="leftMustache"></div>
    </div>
    <div class="rightRound">
      <div class="rightMustache"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageEl: {}
    };
  },
  methods: {
    handleMouseMove() {}
  },
  mounted() {
    this.pageEl = document.getElementsByClassName("page")[0];
    this.pageEl.addEventListener("mousemove", function(e) {
      // x,y 转化为百分比
      let x = e.clientX / window.innerWidth;
      let y = e.clientY / window.innerHeight;

      // css 变量可被继承
      this.style.setProperty("--mouse-x", x);
      this.style.setProperty("--mouse-y", y);
    });
  }
};
</script>

<style lang="stylus" scoped>
.mustache {
  position: relative;
  roundDiameter = 180px;
  // 撑开下面文字
  padding-bottom: 200px;

  .leftRound {
    position: relative;
    top: 200px;
    left: 150px;
    height: roundDiameter;
    width: roundDiameter;
    // color: black;
    // color: hsl(calc(360 * var(--mouse-x, 0.1)), 100%, 75%);
    background-color: currentColor;
    border-radius: 50%;

    .leftMustache {
      position: relative;
      // 让边相切圆心
      right: (roundDiameter / 2);
      width: 100%;
      height: 100%;
      // background-color: currentColor;
      border-bottom: roundDiameter solid currentColor;
      border-radius: 0 0 0 100%;
      top: -(roundDiameter);
      // 这里将旋转中心从自身中心，转移到父级圆的圆心上。
      transform-origin: 100% 75%;
      transform: rotate(calc(0deg - (var(--mouse-y, 0) * 100deg)));
    }
  }

  // 右边
  .rightRound {
    position: relative;
    top: 20px;
    left: 290px;
    height: roundDiameter;
    width: roundDiameter;
    // color: black;
    background-color: currentColor;
    border-radius: 50%;

    .rightMustache {
      position: relative;
      // 让边相切圆心
      left: (roundDiameter / 2);
      width: 100%;
      height: 100%;
      // background-color: currentColor;
      border-bottom: roundDiameter solid currentColor;
      border-radius: 0 0 100% 0;
      top: -(roundDiameter);
      // 这里将旋转中心从自身中心，转移到父级圆的圆心上。
      transform-origin: 0 75%;
      transform: rotate(calc(0deg + (var(--mouse-y, 0) * 100deg)));
    }
  }
}

// 颜色动态变换，stylus 插件有点 bug，下面这些死活编译不过，只能单独抽出来做原生的 css
@css {
  .leftRound {
  color: hsl(calc(360 * var(--mouse-x, 0.1)), 100%, 75%);
  }
  .rightRound {
  color: hsl(calc(360 * var(--mouse-x, 0.1)), 100%, 75%);
  }
}
</style>

