# rust

## 起个好名
Rust 这个名字有三种涵义。

第一种，来源于一种生命力极强的锈菌(Rust Fungi),这种真菌的生命力体现于生命周期内可以产生多达 5 种包子类型，这 5 种形态甚至还可以互相转化。用计算机语言来说，那就是这 5 种生命形态就是“鲁棒性超强”的特征，也因此 Rust 的 Logo 上会有 5 个小圈圈，正是暗合了这种生物界“鲁棒性超强”的生物。

第二种，Rust 是“铁锈”的意思，暗合“裸金属”之意，表面其是系统级编程语言，适用于于系统底层。

第三种，Rust 可以看作是糅合了两个单词“Trust”与“Robust”，暗示了“信任”和“鲁棒性”。


## 语法
带分号 ; 的表达式，固定返回单元类型 (),这其实是一个空元组，单元类型的概念来源于 OCaml，它表示“没有什么特殊的价值”。

> 为什么要专门这么表述呢，这是为了符合一个概念，那就是表达式必定带有返回值，带分号的只是返回了一个“没有价值”的单元类型，且其值为 () 而已。

而函数语句块，默认将会返回花括号中最后一个表达式的值，最后一个表达式如果带分号，那就相当于返回了 )，否则就是返回表达式运算的结果。
return 也是一个表达式，可以用于退出一个函数并返回一个值。

哲学：一切皆表达式。



值表达式不可以出现在位置上下文中，但是位置表达式可以出现在值上下文中。
当位置表达式出现在值上下文中时，将会出现所有权转移，这相当于将右边的位置表达式的内存所有权转交给左边。

如果使用借用操作符 & 会将上下文转化为位置上下文，此时左右都是位置上下文，这会导致所有权的租借，一般会借给一个非纯函数，非纯函数用完后会自动交还所有权。


利用 const fn 定义的函数将会 CTFE，比如分配固定数组时必须是在编译期就知道长度，又想要以函数的形式来分配其长度，此时就需要用到 CTFE 的能力。


向量跟基本数据类型的数组相比，特点是可以动态增长。
代码清单3-5 普通指针与胖指针的占用对比
操作符重载

孤儿原则的限制会对跨文件的编程造成不变，因为任何引用的子库都算是远程文件，想要将某个 trait 使能到所有的库中，由于孤儿原则的限制是要一遍一遍的 copy 代码才行的。
但是标准库有很多的 trait 是对符合条件的所有类型使能的，比如 Box、Fn、FnMut、Sized 等。其他的文件相较标准库也属远程文件，是不符合孤儿原则的。
为此 rust 标准库内部使用了一个叫 #[fundamental] 的属性，这代表了根基，可以不必遵循孤儿原则。

rust 的 trait 系统仍旧不够完善，比如孤儿原则与 #[fundamental] 属性、重叠原则与特化。

4-2 内存对齐，7->8

实现了 Copy 的类型是没有 Drop 析构函数的，因为这种类型会复制，其生命周期不受析构函数的影响，所以没必要。





## 名词
位置表达式（Place Expresion）、值表达式（Value Expression）
位置上下文（Place Context）、值上下文（Value Context）
表达式、单元类型
CTFE(Compile-Time Function Execution)
模式匹配（Patern Matching）、绑定模式（Binding Mode）
VLA(variable-length aray)
复合数据类型：Tuple、Struct、Enum、Union
具名结构体（Named-Field Struct）、元组结构体（Tuple-Like Struct）、单元结构体（Unit-Like Struct）
New Type mode
trait、静态分发、动态分发
胖指针、&str、&mut[T]
底类型：发散函数、continue 和 break、loop、空枚举
turbofish(::<>)
trait：接口抽象、泛型约束、抽象类型、标签 trait
孤儿原则（Orphan Rule）
泛型约束：trait 限定（trait Bound）
标签 trait：Sized trait、Unsize trait、Copy trait、Send trait、Sync trait
?Sized = Sized + Unsize
自动解引用：Deref
无歧义完全限定语法
孤儿原则 -> #[fundamental]，重叠原则 -> 特化
引用：&T、&mut T
原生指针（裸指针）：*const T、*mut T
智能指针-> Deref、Drop：Box、Rc（reference counting）
确定性析构 RALL（Resource Acquisition Is Initialization），资源获取即初始化
RALL 别名：作用域界定的资源管理（Scope-Bound Resource Management，SBRM）




## 勘误
112p，第一行 sencond -> second
