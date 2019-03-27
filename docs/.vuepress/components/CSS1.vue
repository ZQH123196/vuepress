<template>
    <div class="frame">
        <div class="tab">
            <p>eor</p>
        </div>
        <div class="tab">
            <p>皮</p>
        </div>
        <div class="tab">
            <p>到</p>
        </div>
        <div class="tab">
            <p>死</p>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.frame {
    display: flex;
    justify-content: center;
    width: 400px;
    height: 400px;
    background: #ff00cc;
    background: linear-gradient(to right, #333399, #ff00cc);
}

.tab {
    display: flex;
    width: 25%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
    transition: all 0.8s;
}

.tab:nth-child(odd) {
    background: linear-gradient(#e66465, #9198e5);
}

p {
    opacity: 0;
    color: white;
    font-weight: bold;
    transition: all 0.8s;
}

.tab:hover {
    width: 70%;
}

.tab:hover p {
    opacity: 1;
    transform: scale(2.8);
}
</style>
