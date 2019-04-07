# flow-类型检查工具

参考：
* [flow](https://flow.org/en/docs/)

flow 的检查方式有两种：
1. 类型推断：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。
2. 类型注释：事先注释好我们期待的类型，Flow 会基于这些注释来判断。
类型判断

##　初始化

```bash
mkdir flow-learning &&　cd flow-learning
yarn init
yarn add --dev flow-bin

```

初始化：

```bahs
touch index.js
yarn run flow init
```

flow 也跟 eslint、babel 这些工具一样，需求一个配置文件 `.flowconfig`，该文件将会在 `yarn run flow init` 之后自动生成于根目录下。

> 使用 vscode 的需要在 vscode 的配置文件中加入 "javascript.validate.enable": false，否则书写 flow 代码会显示错误。
>
> vscode 有扩展：Flow Language Support 可以获取更好的支持。

## 用例

:::tip

需要 flow 检查的文件，需要在文件开头加入 `/*@flow*/`。

:::

类型推断：

往 index.js 中写入：

```js
/*@flow*/
function split(str) {
    return str.split(' ')
}

split(11) // error
```

运行 `yarn flow`，将会报错类型错误：

`Cannot call str.split because property split is missing in Number [1].`

这是因为 split 是只有字符串才有的方法，而这里传入的是一个数字类型。



类型注释：

> 这个跟 Python 中的用法一模一样，不同的是 Python 中不会报错只做提示用，而 Flow 会。

往 index.js 中写入：

```js
/*@flow*/

function add(x: number, y: number): number {
    return x + y
}

add('Hello', 11)

```

运行 `yarn flow`，将会报错。js 本身是弱类型语言允许这种隐式的类型转换，但是弱类型带来的 bug 远多于其带来的好处，因此 flow 将会对这种离奇的隐式转换报错，以避免埋下祸根。

容器类型：

```js
/*@flow*/

var arr: Array<number> = [1, 2, 3]

arr.push('Hello')
```

这里的限制在于，数字类型的数组不允许非数字类型的插入，其限制写于 <> 之中括号，表面这是纯数字容器。

> 这跟其他语言类型限制的语法一模一样，看来当加上了类型检查 js 就开始向能开发大型程序的语言靠拢了。

类和对象：

```js
/*@flow*/

class Bar {
  x: string;           // x 是字符串
  y: string | number;  // y 可以是字符串或者数字
  z: boolean;

  constructor(x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}

var bar: Bar = new Bar('hello', 4)

var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
  a: 'hello',
  b: 11,
  c: ['hello', 'world'],
  d: new Bar('hello', 3)
}
```

配合类使用，这语法看起来可真繁琐，要是一直这样写，那慢速开发了是。

> 突然感觉这语法有点像 rust 了？

Null：

若想任意类型 `T` 可以为 `null` 或者 `undefined`，只需类似如下写成 `?T` 的格式即可。

```js
/*@flow*/

var foo: ?string = null
```

此时，`foo` 可以为字符串，也可以为 `null`。

类型别名：

这个蛮有用的，类 C 的类型重定义。

```js
// @flow
type MyObject = {
  foo: number,
  bar: boolean,
  baz: string,
};

var val: MyObject = { /* ... */ };
function method(val: MyObject) { /* ... */ }
class Foo { constructor(val: MyObject) { /* ... */ } }

```

类型别名的关键字是 type。



类型泛型：

[生成器详情](https://flow.org/en/docs/types/generics/)

官方文档称为类型生成器，不过这明明跟泛型一样一样的啊。

```js
// @flow
type MyObject<A, B, C> = {
  foo: A,
  bar: B,
  baz: C,
};

var val: MyObject<number, boolean, string> = {
  foo: 1,
  bar: true,
  baz: 'three',
};

```

再来一个：

```js
// @flow

type IdentityWrapper = {
  func<T>(T): T
}

function identity(value) {
  return value;
}

function genericIdentity<T>(value: T): T {
  return value;
}

// $ExpectError
const bad: IdentityWrapper = { func: identity }; // Error!
const good: IdentityWrapper = { func: genericIdentity }; // Works!
```

> 我觉着就是泛型，泛型，泛型？



## flow 与第三方库

[Library Definitions ](https://flow.org/en/docs/libdefs/)

很多前端框架需要自定义类型，这该怎么办呢？

答案是 flow 提供的关键字 declare 。

那怎么引入呢？Flow 有一个叫 `libdef` 的选项，能够支持路径其内定义的所有类型，而 Vue2 也利用了这一特性。

:::tip

看看有名第三方库的做法准没错。

:::

打开 [VUE](https://github.com/vuejs/vue/blob/v2.5.17/.flowconfig) 的 .flowconfig 配置：

```js
[ignore]
.*/node_modules/.*
...

[include]

[libs]
flow

[options]
...
```

可以看到 [libs] 选项下有一个 flow，这表明同一文件夹中的 flow 目录，相当于在 flow 文件内的东西都会被支持为 flow 的类型，就能进行检查。

flow 文件内存了一堆声明文件：

```js
flow
├── compiler.js        # 编译相关
├── component.js       # 组件数据结构
├── global-api.js      # Global API 结构
├── modules.js         # 第三方库定义
├── options.js         # 选项相关
├── ssr.js             # 服务端渲染相关
├── vnode.js           # 虚拟 node 相关
```

瞧一眼 flow/vnode.js：

```js
declare type VNodeChildren = Array<?VNode | string | VNodeChildren> | string;

declare type VNodeComponentOptions = {
  Ctor: Class<Component>;
  propsData: ?Object;
  listeners: ?Object;
  children: ?Array<VNode>;
  tag?: string;
};

declare type MountedComponentVNode = {
  context: Component;
  componentOptions: VNodeComponentOptions;
  componentInstance: Component;
  parent: VNode;
  data: VNodeData;
};

// interface for vnodes in update modules
declare type VNodeWithData = {
  tag: string;
  data: VNodeData;
  children: ?Array<VNode>;
  text: void;
  elm: any;
  ns: string | void;
  context: Component;
  key: string | number | void;
  parent?: VNodeWithData;
  componentOptions?: VNodeComponentOptions;
  componentInstance?: Component;
  isRootInsert: boolean;
};

declare interface VNodeData {
  key?: string | number;
  slot?: string;
  ref?: string;
  is?: string;
  pre?: boolean;
  tag?: string;
  staticClass?: string;
  class?: any;
  staticStyle?: { [key: string]: any };
  style?: Array<Object> | Object;
  normalizedStyle?: Object;
  props?: { [key: string]: any };
  attrs?: { [key: string]: string };
  domProps?: { [key: string]: any };
  hook?: { [key: string]: Function };
  on?: ?{ [key: string]: Function | Array<Function> };
  nativeOn?: { [key: string]: Function | Array<Function> };
  transition?: Object;
  show?: boolean; // marker for v-show
  inlineTemplate?: {
    render: Function;
    staticRenderFns: Array<Function>;
  };
  directives?: Array<VNodeDirective>;
  keepAlive?: boolean;
  scopedSlots?: { [key: string]: Function };
  model?: {
    value: any;
    callback: Function;
  };
};
...
```

一大堆声明的类型，这些都会被 flow 所支持。