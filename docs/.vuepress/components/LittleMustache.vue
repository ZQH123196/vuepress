<template>
  <div>
    <div class="mustache"></div>

  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.mustache {
  position: relative;
  height: 180px;
  width: 180px;
  left: 100px;
  color: black;
  background-color: red; // 隐藏本体
  border-radius: 50%;
  // 直径为 180px 的圆，半径为 90 px
  box-shadow: 150px 240px 0 0 currentColor, 300px 240px 0 0 currentColor;

  // 左边
  &:before {
    content: '';
    width: 210px;
    height: 120px;
    // 移动到参照圆的圆心
    top: 120px;
    left: 30px;
    position: absolute;
    // background-color: red;
    border-bottom: 180px solid red;
    border-radius: 0 0 0 100%;
    // 围绕参照圆心旋转，便于日后添加动画
    transform-origin: 100% 210px;
    transform: rotate(-40deg);
  }

  // 右边
  &:after {
    content: '';
    width: 210px;
    height: 120px;
    top: 120px;
    left: 390px;
    position: absolute;
    // background-color: red;
    border-bottom: 180px solid red;
    border-radius: 0 0 100% 0;
    transform-origin: 0% 210px;
    transform: rotate(40deg);
  }
}
</style>

