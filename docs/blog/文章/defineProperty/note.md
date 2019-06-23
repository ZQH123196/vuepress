# Object.defineProperty

[[toc]]

ES5 规范为了对后续版本进行铺垫，致力于将底层功能向开发者暴露出来。Object.defineProperty 就是其中之一，这个底层 API 也导致了很多前端框架的开发和演进，比如 vue、react...

这个 API 提供了一个能够修改属性描述符的方式，这说法很容易跟“对象自身的值”产生混淆，因为我们平时可能将对象的值也成为“属性”。可以认为属性描述法其实就是一种底层属性而平时用点号所引出的是对象的值，而对象的值其实是底层属性中的一个属性，这些底层属性能够管理对象的一些性质，比如值、是否可写、可配置等。

语法：
`Object.defineProperty(对象, "属性名", 属性描述符)`

以下是定义：
**[属性描述符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#%E5%B1%9E%E6%80%A7%E6%8F%8F%E8%BF%B0%E7%AC%A6)必须是这两种形式之一，不能同时是两者**：
|  数据描述符  	|                             描述                            	|   默认值  	|
|:------------:	|:-----------------------------------------------------------:	|:---------:	|
|     value    	|                           属性值。                          	| undefined 	|
|   writable   	|                       可写，可被赋值。                      	|   false   	|
| configurable 	| 属性描述符能够被改变， 同时该属性也能从对应的对象上被删除。 	|   false   	|
|  enumerable  	|                           可枚举。                          	|   false   	|

|  存取描述符  	|                                      描述                                     	|   默认值  	|
|:------------:	|:-----------------------------------------------------------------------------:	|:---------:	|
|      get     	| 当访问该属性时，该方法会被执行， 方法执行时没有参数传入，但是会传入this对象。 	| undefined 	|
|      set     	|  当属性值修改时，触发执行该方法。 该方法将接受唯一参数，即该属性新的参数值。  	| undefined 	|
| configurable 	|          属性描述符能够被改变， 同时该属性也能从对应的对象上被删除。          	|   false   	|
|  enumerable  	|                                    可枚举。                                   	|   false   	|

## 数据描述符

通过 var 创建的全局变量，是不可配置的，也就是说不能被删除的
```js
var tmp = "tmp"
delete window.tmp // false
console.log(window.tmp) // tmp
```

Object.prototype 是不可枚举的，其实所有的对象都继承自 Object，为什么枚举的时候不能枚举出 Object.prototype 上的属性呢？正是因为 Object.prototype 上的对象都设置了不可枚举。

```js
console.log(Object.prototype) // 可输出
console.log("--------------") // 分隔
for (let prop in Object.prototype) {
    console.log(prop) // 无输出
}
```


## 存取描述符

get 跟 set 是存取描述符的主要功能，这功能 C#、Python、Java 中都有，是进行数据劫持和数据清洗、加工的核心，可以说是对数据存取的一种封装吧，封装就是减少代码量和模块化、抽象化，存取描述符也是如此。

```js
let obj = {age:16, tmpVal:55}
Object.defineProperty(obj, "age", {
    get(){
        console.log("运行 get")
        return this.tmpVal
        },
    set(newVal){
        console.log("运行 set")
        this.tmpVal = newVal
    },
    configurable: true,
    enumerable: true,
})

console.log( obj.age )
obj.age = "change age"
console.log( obj.age )
```

以上的功能不用存取描述符也能轻易做到，比如设置两个函数名叫：setAge 跟 getAge，其实效果都一样，但是这样放在内部的方法显得更加的自然和易读。

>这样就不用像某些语言为了保护数据安全，不得不为每一个数据手动添加 get 或 set 了，轻轻松松。