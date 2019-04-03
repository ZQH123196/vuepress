<template>
    <div
        class="wrapper"
        ref="wrapper"
    >
        <div class="book">
            <div
                class="page"
                v-for="pageNumber of total"
                :key="pageNumber"
                :ref="pageNumber"
            >
                <div
                    @click.self="handleClick"
                    class="front"
                >
                    <h1>{{pageNumber}}</h1>
                </div>
                <div
                    @click.self="handleClick"
                    class="back"
                >
                    <h1>{{pageNumber + "　的背面"}}</h1>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: [1, 2, 3, 4],
            rightPageNumber: 0
        };
    },
    methods: {
        init() {
            const pageEl = this.$refs["wrapper"];
            pageEl.style["perspective"] = "800px";

            // 初始化右页面数
            this.rightPageNumber = this.total.length;

            this.manageIndex();
        },
        handleClick(e) {
            // 向左向右是一个互斥状态。
            // 正面或背面触发，旋转父级 page
            const pageEl = e.target.parentElement;
            if (!pageEl.classList.contains("turnPageLeftClass")) {
                this.turnPageLeft(pageEl);
            } else {
                this.turnPageRight(pageEl);
            }
            this.manageIndex();
        },
        turnPageLeft(pageEl) {
            pageEl.classList.remove("turnPageRightClass");
            pageEl.classList.add("turnPageLeftClass");

            this.rightPageNumber--;
        },
        turnPageRight(pageEl) {
            pageEl.classList.remove("turnPageLeftClass");
            pageEl.classList.add("turnPageRightClass");

            this.rightPageNumber++;
        },
        manageIndex() {
            const totalLength = this.total.length;
            const leftLength = totalLength - this.rightPageNumber;
            for (let i = 1; i <= totalLength; i++) {
                let el = this.$refs[`${i}`][0];
                if (i < leftLength) {
                    el.style["z-index"] = i;
                } else if (i === leftLength) {
                    // 左右最上面的两页分别是 leftLength 和 leftLength+1 的位置
                    el.style["z-index"] = i;
                } else if (i === leftLength + 1) {
                    el.style["z-index"] = -i;
                } else {
                    el.style["z-index"] = -i;
                }
            }
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="stylus" scoped>
* {
    magin: 0;
    padding: 0;
}

.wrapper {
    position: relative;
    width: 800px;
    height: 600px;
    transform-style: preserve-3d;
    color: green;

    .book {
        transform: rotateX(30deg);
        transform-style: preserve-3d;

        .page {
            position: absolute;
            background-color: red;
            top: 100px;
            left: 300px;
            width: 250px;
            height: 400px;
            transform-style: preserve-3d;
            transform-origin: left center;
            backface-visibility: hidden;
            text-align: center;

            .front {
                position: absolute;
                background-color: pink;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
            }

            .back {
                position: absolute;
                background-color: black;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                transform: rotateY(180deg);
            }
        }

        .turnPageLeftClass {
            animation: turnPageLeft 3s;
            // 向前填充模式被保留。
            animation-fill-mode: forwards;
        }

        .turnPageRightClass {
            animation: turnPageRight 3s;
            animation-fill-mode: forwards;
        }

        @keyframes turnPageLeft {
            from {
                transform: rotateY(0deg);
            }

            to {
                transform: rotateY(-180deg);
            }
        }

        @keyframes turnPageRight {
            from {
                transform: rotateY(-180deg);
            }

            to {
                transform: rotateY(0deg);
            }
        }
    }
}
</style>
