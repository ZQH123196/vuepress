<template>
  <div class="margin">
    <div class="padding"></div>

    <div
      class="mouceMoveArea"
      ref="mouceMoveArea"
      @mousemove="handleMousemove"
    >
      <div class="wrapper">
        <img
          class="img"
          v-for="(className, idx) of classList"
          :class="className"
          :key="idx"
          :src="'/images/'+(idx+1)+'.jpg'"
        />
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "ThreeDimensionsCarousel",
  data() {
    return {
      classList: [
        "image-1",
        "image-2",
        "image-3",
        "image-4",
        "image-5",
        "image-6"
      ],
      timer: false
    };
  },
  methods: {
    handleMousemove(e) {
      //   if (this.timer) {
      //     clearTimeout(this.timer);
      //   }
      //   this.timer = setTimeout(() => {
      //     const element = this.$refs["mouceMoveArea"];
      //     element.style.perspectiveOrigin = ` ${e.layerX}px ${e.layerY}px`;
      //   }, 10);
    }
  },
  mounted() {
    // // content 是由 vuepress 添加控制
    // // 为了让鼠标移动区跟 content 一样大小
    // const contentEl = document.getElementsByClassName("content")[0];
    // const mouceMoveAreaEl = this.$refs["mouceMoveArea"];
  }
};
</script>

<style lang="stylus" scoped>
* {
  magin: 0;
  padding: 0;
}

.margin {
  width: 50rem;
  height: 30rem;
}

// padding 作美化填充
.padding {
  position: relative;
  width: 50rem;
  height: 30rem;
}

@keyframes round {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

// 鼠标移动捕捉区用
.mouceMoveArea {
  position: absolute;
  width: 80rem;
  height: 50rem;
  left: 20rem;
  top: 3rem;
  perspective: 100rem;

  .wrapper {
    position: relative;
    top: 12rem;
    left: 40rem;
    width: 15rem;
    height: 15rem;
    // // 撑开下方的文字内容区,并居中自身
    // margin: 5rem auto;
    transform-style: preserve-3d;
    animation: round 10s linear infinite;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    $degree = 60deg;

    .image-1 {
      transform: rotateY($degree * 0) translateZ(20rem);
    }

    .image-2 {
      transform: rotateY($degree * 1) translateZ(20rem);
    }

    .image-3 {
      transform: rotateY($degree * 2) translateZ(20rem);
    }

    .image-4 {
      transform: rotateY($degree * 3) translateZ(20rem);
    }

    .image-5 {
      transform: rotateY($degree * 4) translateZ(20rem);
    }

    .image-6 {
      transform: rotateY($degree * 5) translateZ(20rem);
    }
  }
}
</style>
