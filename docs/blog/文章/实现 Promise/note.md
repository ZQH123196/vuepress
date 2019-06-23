# ES5 实现 Promise

参考：

* [MDN promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [MDN then](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

* ### [*Promises*/A+ 规范](https://promisesaplus.com/)

> 当然，我们无法将自己写的 Promise 加入到微任务中，这个必须底层支持。

里面的名字，都是根据文档中取的。



1. 基本框架
2. 基本实现
3. 基本异步实现
4. 基本链式调用
5. 填补链式调用

首先，分析 Promise 的功能

* 同步执行
* 当且仅当运行了 resolve、rejected 函数，才会更改 status 的状态
* 链式调用时 then 返回非 promise 对象时后续 then 将执行 resolve

new Promise 更像是一个加工用的构造函数，给定一些属性和方法。

then 才是真正开始执行的地方，当使用了 then，才会有参数传递进 new Promise，此时 Promise 创建时内部如果有将 resolve、rejected 函数放入异步操作，那么 痛恨 时 resolve、rejected 函数都不会被执行，即内部状态依旧保持 pending，当同步操作全部完成之后，js 引擎取出之前引擎自己存放的异步队列开始执行，此时将会执行放入异步操作中的 resolve、rejected 函数，而这些函数内部的参数其实早就已经在 then 时给定（pending），直接运行即可。

本身是一个高阶函数，输入的参数是一个函数，返回可以是函数也可以不是。

先考虑三种状态：pending、resolve、reject，其中 resolve 跟 reject 都应该是高阶函数。

书写这三种状态：

```js
function MyPromise(executor) {
    var self = this;
    self.status = "pending";
    self.resolveValue = null;
    self.rejectReason = null;

    function resolve(value) {
        if (self.status == 'pending') {
            self.status = "Fulfilled"
        }
    }

    function reject(reason) {
        if (self.status == 'pending') {
            self.status = "Rejected"
        }
    }

    executor(resolve, reject)
}
```



要能够捕获到抛出的错误：

```js
function MyPromise(executor) {
    var self = this;
    self.status = "pending";
    self.resolveValue = null;
    self.rejectReason = null;

    function resolve(value) { //略 }

    function reject(reason) { //略 }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
```



### 实现 then

可以发现，任何 Promise 实例都有 then 方法，我们可以将 then 写入 prototype 中，让所有实例都拥有 then 方法。

```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    var self = this;
    if (self.status == "Fulfilled") {
        onFulfilled(self.resolveValue)
    }

    if (self.status == "Rejected") {
        onRejected(self.rejectReason)
    }
}
```

测试一下：

```js
var mP1 = new MyPromise( (res, rej) => { res("success") })

var mP2 = new MyPromise( (res, rej) => { rej("failed") })

var mP3 = new MyPromise( (res, rej) => { throw new Error("some error~") })

mP1.then((val) => console.log(val)) // success
mP2.then(null, (res) => console.log(res)) // failed
mP3.then(null, (res) => console.log(res)) // Error: some error~
```





异步操作：

**模拟异步最简单的操作就是用 setTimeout，那么作为同步执行的 then 传进去的函数并不会被立即执行，而是等到同步全部结束之后，才会执行传入的回调函数。即，要想办法将回调函数给保存起来，在同步全部执行完毕之后才执行**。

当执行到 `if (self.status == "pending")` 的时候，只有一种情况，那就是内部有异步操作，否则在

res、rej 都应该加入异步队列，而非 res、rej 都处于同步队列。

```js
function MyPromise(executor) {
    var self = this;
    self.status = "pending";
    self.resolveValue = null;
    self.rejectReason = null;
    self.ResolveCallBackList = [];
    self.RejectCallBackList = [];

    function resolve(value) {
        if (self.status == 'pending') {
            self.status = "Fulfilled"
            self.resolveValue = value
            self.ResolveCallBackList.forEach(function(res) {
                res();
            })
        }
    }

    function reject(reason) {
        if (self.status == 'pending') {
            self.status = "Rejected"
            self.rejectReason = reason
            self.RejectCallBackList.forEach(function(rej) {
                rej();
            })
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    var self = this;
    if (self.status == "Fulfilled") {
        onFulfilled(self.resolveValue)
    }

    if (self.status == "Rejected") {
        onRejected(self.rejectReason)
    }

    // 将传入的回调缓存入队列
    if (self.status == "pending") {
        if (onFulfilled) {
            self.ResolveCallBackList.push(function() {
                onFulfilled(self.resolveValue)
            })
        }

        if (onRejected) {
            self.RejectCallBackList.push(function() {
                onRejected(self.rejectReason)
            })
        }
    }
}

var mP1 = new MyPromise( (res, rej) => { 
    setTimeout(() => {
        res("success")
    }, 0)
})

var mP2 = new MyPromise( (res, rej) => { rej("failed") })

var mP3 = new MyPromise( (res, rej) => { throw new Error("some error~") })

mP1.then((val) => console.log(val)) 
mP2.then(null, (res) => console.log(res)) 
mP3.then(null, (res) => console.log(res)) 
// failed
// Error: some error~
// success
```

这时候，succes 就会在最后输出。



then -> ResolveCallBackList.forEach -> rej -> onFulfilled 最后的值，早在 then 时就已经存入，缓存在函数形成的一个闭包里。

> 注意这里面的值，这些高阶函数，层层叠加，真的是有毒了。





### 基本链式调用：

then 之后需要创建一个新的 Promise

```js
function MyPromise(executor) {
    var self = this;
    self.status = "pending";
    self.resolveValue = null;
    self.rejectReason = null;
    self.ResolveCallBackList = [];
    self.RejectCallBackList = [];

    function resolve(value) {
        if (self.status == 'pending') {
            self.status = "Fulfilled"
            self.resolveValue = value
            self.ResolveCallBackList.forEach(function(res) {
                res();
            })
        }
    }

    function reject(reason) {
        if (self.status == 'pending') {
            self.status = "Rejected"
            self.rejectReason = reason
            self.RejectCallBackList.forEach(function(rej) {
                rej();
            })
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    var self = this;

    var nextPromise = new MyPromise(function(nextRes, nextRej) {
        if (self.status == "Fulfilled") {
            var nextResolveValue = onFulfilled(self.resolveValue)
            nextRes(nextResolveValue)
        }

        if (self.status == "Rejected") {
            var nextRejectValue = onRejected(self.rejectReason)
            nextRej(nextRejectValue)
        }

        // 将传入的回调缓存入队列
        if (self.status == "pending") {
            if (onFulfilled) {
                self.ResolveCallBackList.push(function() {
                    var nextResolveValue = onFulfilled(self.resolveValue)
                    nextRes(nextResolveValue)
                })
            }

            if (onRejected) {
                self.RejectCallBackList.push(function() {
                    var nextRejectValue = onRejected(self.rejectReason)
                    // 如果上一个 then 的返回值不是一个 Promise 对象，那么下一个 then 就执行 resolve
                    if ( !(nextRejectValue instanceof MyPromise) ) {
                        nextRes(nextRejectValue) // 注意此处不是 nextRej，而是 nextRes
                    }
                })
            }
        }
    }
    );
    return nextPromise;
}

var mP2 = new MyPromise((res,rej)=>{
    setTimeout(() => {
        rej("failed")
    }, 0)
})


mP2.then(null, (res) => {
        console.log(res)
        return 1
})
.then((val) => {
    console.log("第二个 then 的接受："+val)
    return 2
}, (res) => {
    console.log("第二个 then 的拒绝："+res)
})
.then((val) => {
    console.log("第三个 then 的接受："+val)
}, (res) => {
    console.log("第三个 then 的拒绝："+res)
})
```



这里变得有点难以理解，核心原因是此时内部的 then 写的已经不再是当前 Promise 的内容，而是下一个 Promise 的内容。

要明白的， Promise 中的内容，其实是会被同步执行的，所以 then 之中的新 Promise 内的内容也是同步执行的。



