<template>
    <div class="HolyGrail">
        <header class="header"> header </header>
        <div class="HolyGrail-body">
            <nav class="HolyGrail-nav"> 导航 </nav>
            <main class="HolyGrail-content"> 主栏 </main>
            <aside class="HolyGrail-ads"> 副栏 </aside>
        </div>
        <footer class="footer"> footer </footer>
    </div>
</template>

<script>
export default {};
</script>

<style>
/* flex 可以相互进行嵌套操作，清爽无痛 */
.HolyGrail {
    margin: 0;
    text-align: center;
    min-height: 100vh;
    /* flexbox */
    display: flex;
    flex-direction: column;
}

.header {
    background-color: #666666;
    flex-basis: 5vh;
}

.HolyGrail-body {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex: 1;
    text-align: center;
}

.HolyGrail-nav {
    flex: 0.5;
    background-color: #d6d6d6;
}

.HolyGrail-content {
    flex: 4;
    background-color: #77bbdd;
}

.HolyGrail-ads {
    flex: 1;
    background-color: #ff6633;
}

.footer {
    background-color: #666666;
}

.header,
.footer,
.HolyGrail-content,
.HolyGrail-nav,
.HolyGrail-ads {
    /* 居中对齐文字 */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

/* 如果是小屏幕，躯干的三栏自动变为垂直叠加。 */
@media (max-width: 768px) {
    .HolyGrail-body {
        flex-direction: column;
    }
}
</style>