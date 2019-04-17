<template>
    <div class="demo1">
        <a href=""></a>
        <a href=""></a>
        <a href="">
            <span></span>
        </a>
        <a href=""></a>

    </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>

.demo1 {
    elSize = 56px
    a {
        display: block;
        width: elSize;
        height: elSize;
        background-image: url('/images/toolbar.png');
        background-size: auto auto;
        transition: background-position 1s;
    }

    imgBottomPosition = -798px
    betweenHeight = -62px
    for row in 1 2 3 4 {
        a:nth-child({row}) {
            background-position: 0 ( imgBottomPosition + (betweenHeight * (row-1)) );
            &:hover {
                background-position: 0 ( imgBottomPosition + (betweenHeight * row) );
            }
        }
    }
}
</style>
