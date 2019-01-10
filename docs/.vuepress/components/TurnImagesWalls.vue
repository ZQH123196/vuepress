<template>
  <div class="wrapper" :class="{ wrapperActive: wrapperActive }">
    <ul>
      <li
        class="item"
        @click="handleClickActive"
      >
        <div :class="init">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li
        class="item"
        @click="handleClickActive"
      >
        <div :class="init">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li
        class="item"
        @click="handleClickActive"
      >
        <div :class="init">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li
        class="item"
        @click="handleClickActive"
      >
        <div :class="init">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li
        class="item"
        @click="handleClickActive"
      >
        <div :class="init">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li
        class="item"
        @click="handleClickActive"
      >
        <div :class="init">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      init: "init inner",
      wrapperActive: false,
    };
  },
  computed: {

  },
  methods: {
    initFunc() {
      // 删除 init 以达到动画效果
      this.init = "inner";
    },
    handleClickActive(e) {
      let liElement = e.srcElement.parentElement.parentElement
      liElement.classList.add('active');
      this.wrapperActive = true
    }
  },
  mounted() {
    const timer = setTimeout(this.initFunc, 200);
  }
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40rem;
  width: 60rem;
  background-color: black;
  border: 1px solid red;
}

li {
  width: 100%;
  height: 100%;
}
.wrapper .inner {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 1s linear;
}

.wrapper .init {
  transform: translateY(100%);
}

/* 点击放大 */
.wrapperActive ul li {
  transition: height 1s linear, width 1s linear;
}

.wrapperActive ul li.active {
  width: 100%
}
.wrapperActive ul li:not(.active) {
  height: 0;
  width: 0;
}

.wrapper ul li .image {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  opacity: 0.5;
}

.wrapper ul {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 90%;
}

.wrapper ul li {
  position: relative;
  flex: 0 1 auto;
  height: 100%;
  width: 100%;
  border: 1px solid white;
  border-radius: 20px;
  background-color: #333;
}

.wrapper ul li .title {
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  /*居中字体*/
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
}

.wrapper ul li:hover .image {
  opacity: 1;
}

.wrapper ul li:nth-of-type(1) .inner {
  transition-delay: 0s;
}
.wrapper ul li:nth-of-type(2) .inner {
  transition-delay: 0.1s;
}
.wrapper ul li:nth-of-type(3) .inner {
  transition-delay: 0.2s;
}
.wrapper ul li:nth-of-type(4) .inner {
  transition-delay: 0.3s;
}
.wrapper ul li:nth-of-type(5) .inner {
  transition-delay: 0.4s;
}
.wrapper ul li:nth-of-type(6) .inner {
  transition-delay: 0.5s;
}

/* image */
.wrapper ul li:nth-of-type(1) .image {
  background-image: url("/images/1.jpg");
}
.wrapper ul li:nth-of-type(2) .image {
  background-image: url("/images/1.jpg");
}
.wrapper ul li:nth-of-type(3) .image {
  background-image: url("/images/1.jpg");
}
.wrapper ul li:nth-of-type(4) .image {
  background-image: url("/images/1.jpg");
}
.wrapper ul li:nth-of-type(5) .image {
  background-image: url("/images/1.jpg");
}
.wrapper ul li:nth-of-type(6) .image {
  background-image: url("/images/1.jpg");
}
</style>
