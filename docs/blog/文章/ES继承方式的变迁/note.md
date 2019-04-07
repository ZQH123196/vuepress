##　ES继承方式的变迁

ES 中的继承分两种，一种是继承原型，一种是继承属性。

继承原型其实就是继承 prototype 上的全部函数。

继承属性其实就是继承其作用域，也就是 this。

> 其他语言中是用 private 跟 public 来决定函数以及属性的继承的，由于 ES6 之前没有类，所以显得很麻烦。

---

## 属性继承：

可以通过 call 或 bind 来继承。

```js
function Product(name, price) {
  this.name = name;
}

function Food(name, price) {
  Product.call(this, name);
  this.category = 'food';
}

var cheese = new Food('cheese');

console.log(cheese.name) // cheese
```

---

## 共享原型：

```js
var father = function(){this.str = "father"}
father.prototype.foo = function(){console.log(this.str)}
var son = function(){this.str = "son"}
son.prototype = father.prototype;

var f = new father();
var s = new son();

f.foo() // father
s.foo() // foo
```

共享原型很简单，继承下来的全是同一个原型，但是根据 . 号左边的对象不同，其内部的 this 环境会不同。

缺点也非常明显：

1. 由于全部共用一个原型，太过脆弱，有些函数很容易就被子类给覆盖掉，而且父类对此一无所知。
2. 限制比自由更重要，在共享原型上，就连“凶器”也会被共享，任何继承者都可能造成巨大破坏。比如一个飞机的父类类，当你创建了一个子的客机类之后，在创建一个战斗机类，那么所有创建的客机类也会同样拥有战斗机的功能。

---

## 圣杯模式：

```js
function Father(){}
function Son(){}
Father.prototype.name="eor";
//圣杯模式
Son.prototype = new Father();
var son = new Son();
console.log(son.constructor) // function Son()
var father = new Father(); 
Son.prototype.sex = 'male';

console.log(son.name); // eor
console.log(son.sex); // male
console.log(father.sex); // undefined
console.log(son.constructor) // function Father()，构造者被更改
```

这种圣杯模式的本质在于：子类的原型完全变成了一个新生成的独立的父类对象今后为 Son.prototype 添加属性时，全部都会加在这个对象里面，所以不会对父级产生影响。而向上查找是沿着原型查找，可以顺利查找到父级的属性，实现继承。但也因此其子类的 construct 将会是父类，而不是子类自己。

缺点：

- 子类对象将会以父类为构造者，而不是子类自身。
- 不仅是继承了原型，其私有属性也一样继承了。

> 我不知道这跟圣杯有什么关系？



---



## 共享原型跟圣杯模式的组合拳：

```js
function Father(){}
function Son(){}
Father.prototype.name="eor";

function Tmp(){}
Tmp.prototype = Father.prototype; // 先用中间量共享原型
Son.prototype = new Tmp(); // 这样会继承中间量的私有属性，但是中间量一无所有，相当仅继承了其原型

var son = new Son();
son.constructor = Son; // 修正其错误的构造者为自身
var father = new Father(); 
Son.prototype.sex = 'male';

console.log(son.name); // eor
console.log(son.sex); // male
console.log(father.sex); // undefined
console.log(son.constructor) // function Son()
```

先让中间量共享父类原型，然后子类的原型继承自中间量的对象，这就完成了隔离，并且因为中间量没有属性，也避免了继承父类的私有属性。同时在每个对象创建时，将其构造者修正即可。

---

## 通过 `__proto__` 修改原型链来继承：

利用 `__proto__` 属性来修改原型链，坦白讲这个属性本来不是标准来着，但是各个浏览器都实现了这个属性．．．．．．大家都实现，是因为这玩意好哇，直接就相当于原型链中的父类的一个引用，非常的直观～

```
function Father(){}
function Son(){}
Father.prototype.name="eor";

Son.prototype.__proto__ = Father.prototype; // 此处继承

var son = new Son();
var father = new Father(); 
Son.prototype.sex = 'male';

console.log(son.name); // eor
console.log(son.sex); // male
console.log(father.sex); // undefined
console.log(son.constructor) // function Son()
```

这种是我一直在用的方式，简单清晰明了，不会将父类的属性也继承过来，而且不会导致 constructor 的错误。

---

## 基于 ES6 的原型继承：

`__proto__` 虽好，毕竟不是标准，现在应该更加的往标准靠拢，ES6 给出了一个专门用于设置原型的函数 Object.setPrototypeOf(Son.prototype, Father.prototype)。

```js
function Father(){}
function Son(){}
Father.prototype.name="eor";

Object.setPrototypeOf(Son.prototype, Father.prototype) // 此处继承

var son = new Son();
var father = new Father(); 
Son.prototype.sex = 'male';

console.log(son.name); // eor
console.log(son.sex); // male
console.log(father.sex); // undefined
console.log(son.constructor) // function Son()
```

> 这用起来其实跟 `__proto__` 没两样，但毕竟是标准上写的，多用这个少用 `__proto__` 吧！

