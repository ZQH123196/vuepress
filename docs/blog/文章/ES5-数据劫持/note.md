# ES5-数据劫持

嘛，时光推移，现在 VUE3 都要放弃 ES5 的 defineProperty 改用 Proxy&Reflect 实现了，ES6 的未来已来。ES5 的数据劫持一直用，一直没总结，是时候来一波了，同时也是为 ES6 版的数据劫持做铺垫。

VUE2 双向数据绑定的核心功能由 Observer、Compile、Watcher 三部分实现，其中 Observer 部分的功能正是由 ES5 的 Object.defineProperty 实现。

> Observer：监测数据变化进行相应回调（数据劫持）；

## 思路

说到数据劫持这玩意，当初第一个念头就是 Python 中的魔法函数，那些魔法函数说白就是在底下偷偷的干些事情，其中一些就用到了数据劫持，这在 Python 中被称作代理，在设计模式中被称作代理模式，但这些名称，都没有·数据劫持·来的帅气！

不过帅气归帅气，其内部的实现原理其实差不多，都是依赖于 get、set 来进行操作。
没什么复杂的，举个栗子，当我们往 input 标签输入一个东西时，必定会更改 input 标签上的 value 属性，那么当我们往这个 value 值添加一个 set 函数时，触发更改之后就完全移交给 set 函数来处理了，而不是直接赋值，那么 set 作为一个函数能干什么呢？想干什么干什么！

## 实现



<input id="ES5-dataGrab-input" />
<div id="ES5-dataGrab">

<script>
    let oInput = document.getElementById("ES5-dataGrab-input");
    let oDiv = document.getElementById('ES5-dataGrab-input');

    let oData = {
        value: 'eor',
        name: 'zqh'
    };

    oInput.onInput = function () {
        oData.value = this.value;
    }

    function upDate () {
        oDiv.innerText = pData.value;
    }

    upData();

    // 监听对象的某个属性是否发生改变
    function Observer (data) {
        // 数据为空或不是对象，就没有监控的意义了
        if (!data || typeof data != "object") {
            return data;
        }
        Object 
    }

    function defineRective (data, key, val) {
        Object.defineProperty(data, key, {
            get () {
                return val;
            },
            set () {

            }
        })
    }

    Observer(oData);
</script>