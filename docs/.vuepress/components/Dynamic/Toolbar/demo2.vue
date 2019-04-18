<template>
    <div class="demo1">
        <a href="javascript:;"><span class="toolbar-btn"></span></a>
        <a href="javascript:;"><span class="toolbar-btn"></span></a>
        <a href="javascript:;"><span class="toolbar-btn"></span></a>
        <a href="javascript:;"><span class="toolbar-btn"></span></a>
    </div>
</template>

<style lang="stylus" scoped>
.demo1 {
    position: relative;
    spritImage = '/images/toolbar.png';
    elSize = 56px;

    a {
        position: relative;
        display: block;
        width: elSize;
        height: elSize;
        background-image: url(spritImage);
        background-size: auto auto;
        transition: background-position 1s;
    }

    // 所有的值都根据最底下的图标的像素位置来进行相对位移
    bottomPosition = -856px;
    betweenHeight = 62px;

    for row in 1 2 3 4 {
        a:nth-child({row}) {
            // 从下往上算很不直观，真是傻逼了，感觉从上往下算要好得多
            noPosition = bottomPosition + (124px * (row - 1)) + betweenHeight;
            background-position: 0 noPosition;

            &:hover {
                background-position: 0 (noPosition - betweenHeight);
                // TODO： 下面样式并未正确挂载
                .code {
                    opacity: 1;
                    transform-scale(1);
                    height: 212px;
                    background-position: 0 0;
                }
            }
        }
    }

    a > span.code {
        position: absolute;
        background-image: url(spritImage);
        left: elSize;
        top: elSize - 10px;
        width: 172px;
        opacity: 0;
        transform: scale(0.01);
        transform: background-position 1s, transform-scale 1s;
        transform-origin: 5% 5%;
    }
}
</style>
