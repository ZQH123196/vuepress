<template>
    <div class="bottom">
        bottom
        <div
            class="mask"
            @click="changeLayer"
            :style="{opacity: opacity}"
            ref="mask"
        ></div>
        <div class="top">top</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            opacity: 0.8
        }
    },
    methods: {
        changeLayer() {
            if (this.opacity == 0.8) {this.opacity = 0}
            else {this.opacity = 0.8}
        }
    }
};
</script>

<style lang="stylus" scoped>
.bottom {
    position: relative;
    z-index: 1;
    height: 300px;
    width: 300px;
    background-color: pink;
}

.mask {
    position: absolute;
    top: 0px;
    z-index: 2;
    height: 300px;
    width: 300px;
    opacity: 0.8;
    background-color: gray;
}

.top {
    position: absolute;
    z-index: 3;
    height: 20%;
    width: 20%;
    left: 40%;
    top: 40%;
    text-align: center;
    display: table-cell;
    vertical-align:middle;
    background-color: green;
}
</style>
