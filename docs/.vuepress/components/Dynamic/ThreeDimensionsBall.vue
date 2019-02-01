<template>
    <div class="wrap">
        <div class="inner"></div>
        <div class="x">
            <div class="x1"></div>
            <div class="x2"></div>
            <!-- <div class="xInner"></div> -->
            <div class="y"></div>
            <div class="y1"></div>
            <div class="y2"></div>
            <!-- <div class="yInner"></div> -->
            <div class="z"></div>
            <div class="z1"></div>
            <div class="z2"></div>
            <!-- <div class="zInner"></div> -->
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background: black;
}
.wrap {
    margin: 150px auto;
    position: relative;
    box-sizing: border-box;
}
.wrap,
.x,
.y,
.z {
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
.x1,
.x2,
.y,
.y1,
.y2,
.z,
.z1,
.z2,
.xInner,
.yInner,
.zInner {
    position: absolute;
}
.x1,
.x2,
.y1,
.y2,
.z1,
.z2 {
    width: 87.5%;
    height: 87.5%;
    border-radius: 50%;
}
.x {
    position: relative;
    border: 1px solid #ff0099;
    transform-style: preserve-3d;
    animation: mymove 10s linear infinite;
}
.y {
    top: 0;
    left: 0;
    border: 2px solid #0099ff;
    transform: rotateX(90deg);
}
.z {
    top: 0;
    left: 0;
    border: 1px solid #ffcc33;
    transform: rotateY(90deg);
}
.x1 {
    top: 6.25%;
    left: 6.25%;
    border: 1px solid #ff0099;

    transform: translateZ(50px);
}
.x2 {
    top: 6.25%;
    left: 6.25%;
    border: 1px solid #ff0099;
    transform: rotateX(180deg) translateZ(50px);
}
.y1 {
    top: 6.25%;
    left: 6.25%;
    border: 1px solid #0099ff;

    transform: rotateX(90deg) translateZ(50px);
}
.y2 {
    top: 6.25%;
    left: 6.25%;
    border: 1px solid #0099ff;
    transform: rotateX(270deg) translateZ(50px);
}
.z1 {
    top: 6.25%;
    left: 6.25%;
    border: 1px solid #ffcc33;
    transform: rotateY(90deg) translateZ(50px);
}
.z2 {
    top: 6.25%;
    left: 6.25%;
    border: 1px solid #ffcc33;
    transform: rotateY(270deg) translateZ(50px);
}
.xInner {
    border: 1px solid #ff0099;
    width: 100%;
    top: 50%;
}
.yInner {
    height: 100%;
    left: 50%;
    border: 1px solid #0099ff;
    transform: rotateX(90deg);
}
.zInner {
    height: 100%;
    left: 50%;
    border: 1px solid #ffcc33;
    transform: rotateY(90deg);
}

@keyframes mymove {
    100% {
        transform: rotateX(360deg) rotateY(360deg);
    }
}
</style>
