<template>
  <div
    class="wrapper"
    :class="{ wrapperActive: wrapperActive }"
  >
    <ul>
      <li
        class="item"
        @click.stop="handleClickActive"
        v-for="i of number"
        :key="i"
      >
        <div :class="init">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div
              class="close"
              @click.stop="handleClickClose"
            ></div>
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
      number: 6
    };
  },
  computed: {},
  methods: {
    initFunc() {
      // 删除 init 以达到动画效果
      this.init = "inner";
    },
    handleClickActive(e) {
      console.log("add");

      let liElement = e.srcElement.parentElement.parentElement;
      liElement.classList.add("active");
      this.$refs.active = liElement;
      this.wrapperActive = true;
    },
    handleClickClose(e) {
      this.wrapperActive = false;
      let liEl = this.$refs.active;
      liEl.classList.remove("active");
      console.log(this.$refs);
      console.log("remove");
    }
  },
  mounted() {
    const timer = setTimeout(this.initFunc, 200);
  }
};
</script>

<style lang="stylus" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.wrapper ul {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 90%;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40rem;
  width: 60rem;
  background-color: black;
  border: 1px solid red;

  ul {
    .item {
      .inner {
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition: transform 1s linear;
      }
    }

    .init {
      transform: translateY(100%);
    }
  }

  ul li .image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    opacity: 0.5;
  }

  ul {
    li:nth-of-type(1) .inner {
      transition-delay: 0s;
    }

    li:nth-of-type(2) .inner {
      transition-delay: 0.1s;
    }

    li:nth-of-type(3) .inner {
      transition-delay: 0.2s;
    }

    li:nth-of-type(4) .inner {
      transition-delay: 0.3s;
    }

    li:nth-of-type(5) .inner {
      transition-delay: 0.4s;
    }

    li:nth-of-type(6) .inner {
      transition-delay: 0.5s;
    }

    /* image */
    li:nth-of-type(1) .image {
      background-image: url('/images/1.jpg');
    }

    li:nth-of-type(2) .image {
      background-image: url('/images/1.jpg');
    }

    li:nth-of-type(3) .image {
      background-image: url('/images/1.jpg');
    }

    li:nth-of-type(4) .image {
      background-image: url('/images/1.jpg');
    }

    li:nth-of-type(5) .image {
      background-image: url('/images/1.jpg');
    }

    li:nth-of-type(6) .image {
      background-image: url('/images/1.jpg');
    }
  }
}

// 动画
.wrapper.wrapperActive ul {
  li.active {
    width: 100%;
  }

  li:not(.active) {
    height: 0;
    width: 0;
  }

  li {
    transition: height 1s linear, width 1s 0.5s linear;
  }
}

/* 画 × */
.wrapper ul li {
  .dir .close {
    z-index: 5;
    position: absolute;
    top: 50px;
    width: 50px;
    height: 50px;
    /* opacity: 0; */
  }

  .dir .close {
    position: absolute;
    right: 50px;
    width: 30px;
    height: 30px;
  }

  .dir .close::before, .dir .close::after {
    content: '';
    display: block;
    position: absolute;
    width: 30px;
    height: 4px;
    background-color: white;
  }

  .dir .close::before {
    transform: rotate(45deg);
  }

  .dir .close::after {
    transform: rotate(-45deg);
  }
}

.wrapper ul li {
  position: relative;
  flex: 0 1 auto;
  height: 100%;
  width: 100%;
  border: 3px solid black;
  border-radius: 20px;
  background-color: #333;
  /* 动画还原 */
  transition: width 1s 0.5s linear, height 1s linear;
}

.wrapper ul li .title {
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  /* 居中字体 */
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
}

.wrapper ul li:hover .image {
  opacity: 1;
}
</style>
