<template>
  <div>
    <div class="wrapper">
      <div class="cube currentPosition">
        <img src="/images/1.jpg">
        <img src="/images/2.jpg">
        <img src="/images/3.jpg">
        <img src="/images/4.jpg">
        <img src="/images/5.jpg">
        <img src="/images/6.jpg">
      </div>
      <h2>请点击下方的图片按钮</h2>
      <div class="image-buttons">
        <input
          type="image"
          v-for="(item, idx) of classList"
          :key="idx"
          :class="item"
          :src="'/images/'+(idx+1)+'.jpg'"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MagicCube",
  data() {
    return {
      classList: [
        "images-1",
        "images-2",
        "images-3",
        "images-4",
        "images-5",
        "images-6"
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  font-size: 10px;

  body {
    background: black;
    color: white;
    text-align: center;

    h2 {
      padding-top: 8rem;
    }
  }
}

.wrapper {
  width: 30rem;
  height: 30rem;
  margin: 3rem auto 10rem;

  .cube {
    perspective: 100rem;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
    transform-origin: center;
    perspective-origin: center;
    // 动画过渡在此
    transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

    img {
      position: absolute;
      display: block;
      background-size: contain;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
  }
}

// 第一第二上下面，第三第四左右面，五六前后面
.wrapper .cube {
  img:nth-child(1) {
    transform: translateZ(15rem);
  }

  img:nth-child(2) {
    transform: rotateX(-180deg) translateZ(15rem);
  }

  img:nth-child(3) {
    transform: rotateY(90deg) translateZ(15rem);
  }

  img:nth-child(4) {
    transform: rotateY(-90deg) translateZ(15rem);
  }

  img:nth-child(5) {
    transform: rotateX(90deg) translateZ(15rem);
  }

  img:nth-child(6) {
    transform: rotateX(-90deg) translateZ(15rem);
  }
}

.cube.currentPosition {
  // 整个魔方倾斜
  transform: translateZ(-15rem) rotateX(-15deg) rotateY(15deg);
}

// 被点击动画
.cube.clickImage-1 {
  transform: translateZ(-15rem);
}

.cube.clickImage-2 {
  transform: translateZ(-15rem) rotateX(180deg);
}

.cube.clickImage-3 {
  transform: translateZ(-15rem) rotateY(-90deg);
}

.cube.clickImage-4 {
  transform: translateZ(-15rem) rotateY(90deg);
}

.cube.clickImage-5 {
  transform: translateZ(-15rem) rotateX(-90deg);
}

.cube.clickImage-6 {
  transform: translateZ(-15rem) rotateX(90deg);
}

// 图片按钮
.image-buttons {
  display: grid;
  // 3 列，123 列宽都是 10.5rem
  grid-template-columns: 10.5rem 10.5rem 10.5rem;
  // 3 行，123 行都是 10.5rem
  grid-template-rows: 10.5rem 10.5rem 10.5rem;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  justify-content: center;

  input {
    width: 100%;
    height: 100%;

    &:focus {
      border: 3px solid orange;
    }
  }
}
</style>