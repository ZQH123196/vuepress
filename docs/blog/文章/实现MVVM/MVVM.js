/*
    最简实现
*/

class Observe {
    constructor(obj, callback) {
        this.obj = obj;
        this.callback = callback;
        this.listen(this.obj, this.callback);
    }
    listen(obj, callback) {
        Object.defineProperty(obj, "a", {
            get: function () {
                return this.a;
            },
            set: function (val) {
                a = val;
                console.log(a);
            },
            configurable: true, 
            enumerable: true, 
        })
    }
}


// 定义一个可以通知数据变化的回调
var callback = function (newValue, oldValue) {
    console.log(`newValue: ${newValue}`);
    console.log(`oldValue: ${oldValue}`);
}

var data = {
    a: "a",
    deep1: {
        b: "b",
        c: ["c", "c", "c"],
        d: { 1: "1", 2: "2" },
        deep2: {
            e: "e"
        }
    }
}

var tmp = new Observe(data, callback);

tmp.obj.a