<template>
    <div class="wrapper">
        <div id="opt">
            <dl>
                <dt>Console</dt>
                <dd
                    @click="viewCoverClick"
                    :class="{cur: option==='initial'}"
                >View Cover</dd>
                <dd
                    @click="viewBackCLick"
                    :class="{cur: option==='choseBack'}"
                >View Back</dd>
                <dd
                    @click="viewOpenBookClick"
                    :class="{cur: option==='choseOpen'}"
                >Open/Close book</dd>
                <dd
                    @click="viewRotateClick"
                    :class="{cur: option==='choseRotate'}"
                >360° Showcase</dd>
            </dl>
        </div>

        <div
            id="display"
            ref="book"
            class="initial"
        >
            <div class="main">
                <div class="book-font">
                    <div class="book-cover">
                        <h1 class="title">Wuthering Heights</h1>
                        <h2 class="author">Emily Bronte</h2>
                        <div class="publisher">Oxford University Press, USA</div>
                    </div>
                    <div class="book-cover-back"></div>
                </div>
                <div class="bookContent">
                    <!-- 占位，无书页内容 -->
                </div>
                <div class="book-back">
                    <div class="description">
                        <p>"Ideal for the college survey course: judicious introduction plus just the right admixture of
                            explanatory notes (vital for American students' comprehension of dialect words), up-to-date
                            bibliography, and several other brief, indispensable supports to well-informed reading."</p>
                        <p class="txt-right">--Katherine Linehan, Oberlin College</p>
                    </div>
                    <div class="isbn"><img src="http://www.bluesdream.com/case/css3/3d-book-showcase/images/isbn.png"></div>
                </div>
                <div class="book-bone">
                    <h2>Emily Bronte　Wuthering Heights</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            option: "initial"
        };
    },
    methods: {
        viewCoverClick(e) {
            this.option = "initial";
        },
        viewBackCLick(e) {
            if (this.option != "choseBack") {
                this.option = "choseBack";
            } else {
                this.option = "initial";
            }
        },
        viewOpenBookClick(e) {
            if (this.option != "choseOpen") {
                this.option = "choseOpen";
            } else {
                this.option = "initial";
            }
        },
        viewRotateClick(e) {
            if (this.option != "choseRotate") {
                this.option = "choseRotate";
            } else {
                this.option = "initial";
            }
        }
    },
    watch: {
        option() {
            const bookEl = this.$refs["book"];
            bookEl.classList = "";
            switch (this.option) {
                case "initial":
                    bookEl.classList.add("initial");
                    break;
                case "choseBack":
                    bookEl.classList.add("view-back");
                    break;
                case "choseOpen":
                    bookEl.classList.add("open-book");
                    break;
                case "choseRotate":
                    bookEl.classList.add("viewRotate");
                    break;
                default:
                    break;
            }
        }
    },
    mounted() {}
};
</script>

<style lang="stylus" scopded>
* {
    margin: 0;
    padding: 0;
}

// 全局样式
.wrapper {
    width: 50vw;
    font-family: 'Cardo', Arial, sans-serif;
}

.txt-right {
    text-align: right;
}

.demo-title {
    height: 32px;
    font-size: 32px;
    color: #92684f;
    text-align: center;
    margin: 30px 0 44px 0;
    text-shadow: 0 2px 4px rgba(41, 48, 58, 0.3);
}

#display {
    position: relative;
    width: 420px;
    margin: 0 auto;
    perspective: 2000px;

    .main {
        width: 420px;
        height: 560px;
        color: #92684f;
        position: relative;
        transform-style: preserve-3d;
    }
}

// 封面
.book-font {
    width: 420px;
    height: 560px;
    position: absolute;
    top: 0;
    bottom: 0;
    font-size: 15px;
    text-align: center;
    text-shadow: 0 2px 0 rgba(30, 35, 45, 1);
    box-shadow: inset 3px 0 10px rgba(0, 0, 0, 0.1); /* 给书本添加光照阴影 */
    z-index: 10;
    transform-style: preserve-3d;
    transform-origin: 0% 50%;
    transition: transform 0.5s;
    // 上浮
    transform: translateZ(25px);

    .book-cover {
        width: 420px;
        height: 560px;
        overflow: hidden;
        position: absolute;
        top: 0;
        bottom: 0;
        background: #29303a url('http://www.bluesdream.com/case/css3/3d-book-showcase/images/img.jpg') 0 200px;
        background-repeat: no-repeat;
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    .book-cover-back {
        width: 420px;
        height: 560px;
        position: absolute;
        top: 0;
        bottom: 0;
        background: #29303a;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        transform: rotateY(-180deg);
    }

    .title {
        margin: 70px 0 25px 0;
        height: 38px;
        font-size: 38px;
    }

    .author {
        height: 20px;
        font-size: 20px;
    }

    .publisher {
        width: 100%;
        position: absolute;
        bottom: 22px;
    }
}

// 书背
.book-back {
    width: 420px;
    background: #29303a;
    position: absolute;
    top: 0;
    bottom: 0;
    color: white;
    transform: rotateY(-180deg) translate3d(0, 0, 25px);
    z-index: 8;

    .description {
        font-size: 14px;
        line-height: 20px;
        margin-top: 50px;
        padding: 10px 20px 10px 30px;
        background: rgba(255, 255, 255, 0.1);
    }

    p {
        padding: 5px 0;
    }

    .isbn {
        position: absolute;
        bottom: 20px;
        left: 30px;
    }
}

// 骨架，左侧连接处
.book-bone {
    width: 50px;
    background: #29303a;
    /* 旋转的时候可能会有缝隙漏洞，用阴影来填充它 */
    box-shadow: 1px 0 0 #29303a, -1px 0 0 #29303a;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -25px;
    transform: rotateY(-90deg);

    h2 {
        width: 530px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        text-align: right;
        padding: 0 15px;
        transform-origin: 0 0;
        transform: rotate(90deg) translateY(-50px);
    }

    span {
        font-size: 14px;
        padding-right: 20px;
    }
}

/* = Flip
-------------------------------------------------------------- */
/* Cover */
.initial .main {
    transition: transform 0.5s;

    &:hover .main {
        transition: transform 0.5s;
        transform: rotateY(-40deg);
    }
}

/* Cover Back */
.view-back .main {
    transition: transform 0.5s;
    transform: rotateY(180deg);

    &:hover .main {
        transition: transform 0.5s;
        transform: rotateY(140deg);
    }
}

/* Open */
.open-book {
    transition: transform 0.5s;
    transform: translate3d(50%, 0, 0);

    &:hover .main {
        transform: rotate3d(1, 1, 0, 15deg);
    }

    .book-font {
        transform: translate3d(0, 0, 25px) rotateY(-160deg);
    }
}

/* viewRotate */
.viewRotate {
    .main {
        transition: transform 6s;
        transform: rotateY(360deg);
    }

    &:hover .main {
        transition: transform 12s;
        transform: rotateY(-360deg);
    }
}

/* = Opt
-------------------------------------------------------------- */
#opt {
    width: 150px;
    line-height: 30px;
    text-align: center;
    padding: 10px 10px 5px 10px;
    background: rgba(255, 255, 255, 0.4);
    position: fixed;
    top: 10%;
    right: 6%;
    z-index: 100px;
}

#opt:after {
    content: '';
    width: 105%;
    height: 104%;
    position: absolute;
    top: -4%;
    left: -5%;
    border: 4px solid rgba(255, 255, 255, 0.3);
    z-index: -1;
}

#opt dt {
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

#opt dd {
    color: #999;
    cursor: pointer;
    background: rgba(170, 170, 170, 0.1);
    margin-bottom: 5px;
}

#opt dd:hover {
    color: rgba(255, 255, 255, 0.8);
    box-shadow: inset 2px 0 0 rgba(85, 85, 85, 0.2);
    background: rgba(85, 85, 85, 0.4);
}

#opt .cur {
    color: black;
    box-shadow: inset 2px 0 0 rgba(85, 85, 85, 0.2);
    background: rgba(85, 85, 85, 0.2);
}
</style>
