我觉得 C 要好理解，Go 的类型后置跟英语里用从句跟在后面补充描述一样
C: This is an unsigned variable.
Go: This is a variable which is unsigned.

golang中根据首字母的大小写来确定可以访问的权限。无论是方法名、常量、变量名还是结构体的名称，如果首字母大写，则可以被其他的包访问；如果首字母小写，则只能在本包中使用可以简单的理解成: 首字母大写是公有的，首字母小写是私有的文件的命名

关于 switch，Go 自动提供了在这些语言中每个 case 后面所需的 `break` 语句。

len 计算切片的长度，而 cap 计算切片的总容量，大多数时候这二者计算出来是一样的，但是在初始化时，可以申请了空间但不赋值，这时候 len 跟 cap 值就不同。同时也可以用来描述一种切片还可以扩展的状态，cap - len 就是切片还能扩展多少的余地。

```go
b := make([]int, 0, 5)
fmt.Printf("%s len=%d cap=%d %v\n",
		b, len(b), cap(b), b)
```

> cap就是方便扩容的.
>
> 如果单纯只有ptr和len, **内部还要有一个变量A来记录slice的元素个数, 这样每次插入的时候都会对变量A自增并且判断是否大于len,** 但在此时, 也会对len自增的, 这样就会有多次的赋值操作.
>
> 有了cap后, 就可以避免了对上面粗体的维护变量A的步骤, 单纯的判断是否要扩容就ok,  效率提高了.

如果我们有一个指向结构体的指针 `p`，那么可以通过 `(*p).X` 来访问其字段 `X`。不过这么写太啰嗦了，所以语言也允许我们使用隐式间接引用，直接写 `p.X` 就可以。

切片跟在 PY、ES 中的 slice 概念不同，GO 创建的是一段原数组地址的引用，而不是副本。某种意义上，减少了内存占用但是提高了 BUG 出现率。由于是原数组某一段地址的引用，所以可以这样：

```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s) // len=6 cap=6 [2 3 5 7 11 13]

	// 截取切片使其长度为 0
	s = s[:0]
	printSlice(s) // len=0 cap=6 []

	// 拓展其长度
	s = s[:4]
	printSlice(s) // len=4 cap=6 [2 3 5 7]

	// 舍弃前两个值
	s = s[2:]
	printSlice(s) // len=2 cap=4 [5 7]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```



这个 for 有点舒服了，统一了 while 和 for 的功能，而且不用写括号，可以可以。

```go
package main

import "fmt"

func main() {
    // 常规 for
    sum := 0
	for i := 0; i < 5; i++ {
		sum += i
	}
	fmt.Println(sum) // 10
    
    // while 功能
    sum = 1
	for sum < 5 {
		sum += sum
	}
	fmt.Println(sum) // 8
	
    // 无限循环很简洁
	for {}
}
```



自动命名的返回值

可以给一个函数的返回值指定名字。如果指定了一个返回值的名字，则可以视为在该函数的第一行中定义了该名字的变量。



```go
package main

import "fmt"

func split(sum int) (x, y, z int) {
	x = sum * 4 / 9
	y = sum - x
	var c = sum
	c++
	return
}

func main() {
	fmt.Println(split(17)) // 7 10 0
}
```

> x、y、z 都相当于在第一行定义了，所以 z 被初始化为 0，而 c 不在返回值中，不会自动定义，必须要手动。



灵活的创建语法，甚至于 struct

```go
s := []struct {
    i int
    b bool
}{
    {2, true},
    {3, false},
    {5, true},
    {7, true},
    {11, false},
    {13, true},
}
fmt.Println(s)
```



隐式/自动接口实现

心情复杂，没有显式的 implements 总觉得怪怪的，而且也不能一眼就看出谁实现了那个接口，必须要自己去一个个观察是否是全部实现了接口的要求才行。



类型选择

niubility，这空接口，真是奇了？！感觉就是 C 中能存任何东西的 void* ?那可不太好，JS 也有这功能，结果现在天天叫着要类型检查，这种自由在大型项目中是灾难，而且也没有泛型。

```go
package main

import "fmt"

func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("Twice %v is %v\n", v, v*2)
	case string:
		fmt.Printf("%q is %v bytes long\n", v, len(v))
	default:
		fmt.Printf("I don't know about type %T!\n", v)
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}
```



Golang 中的接口，更类似于，自由的添加接口，自由分割，同时，对象也可以自由的添加属性。



类型断言，niubility，这语法好用的不行啊！

t := i.(T)

 该语句断言接口值 i 保存了具体类型 T，并将其底层类型为 T 的值赋予变量 t。
若 i 并未保存 T 类型的值，该语句就会触发一个恐慌。 

 为了 判断 一个接口值是否保存了一个特定的类型，类型断言可返回两个值：其底层值以及一个报告断言是否成功的布尔值。

t, ok := i.(T)

 若 i 保存了一个 T，那么 t 将会是其底层值，而 ok 为 true。

否则，ok 将为 false 而 t 将为 T 类型的零值，程序并不会产生恐慌。 



通常使用这样的格式来声明通道：`var identifier chan datatype`



Golang 的信道是一个先入先出的队列，这种带箭头的语法真是舒服，在发生和接受方都准备前默认情况是堵塞，真不错。



select 牛逼了......

​     `select` 语句使一个 Go 程可以等待多个通信操作。   

​     `select` 会阻塞到某个分支可以继续执行为止，这时就会执行该分支。当多个分支都准备好时会随机选择一个执行。   

可以将一直要运行的代码放到 default 中去。



Golang 加锁很容易，解锁也很容易，可以使用 defer 来确保所会被释放。



## 带缓冲的信道

​     信道可以是 *带缓冲的*。将缓冲长度作为第二个参数提供给 `make` 来初始化一个带缓冲的信道：   

```
ch := make(chan int, 100)
```

​     仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。   



## range 和 close

​     发送者可通过 `close` 关闭一个信道来表示没有需要发送的值了。接收者可以通过为接收表达式分配第二个参数来测试信道是否被关闭：若没有值可以接收且信道已被关闭，那么在执行完   

```
v, ok := <-ch
```

​     此时 `ok` 会被设置为 `false`。   

​     循环 `for i := range c` 会不断从信道接收值，直到它被关闭。   

​     **注意：** 只有发送者才能关闭信道，而接收者不能。向一个已经关闭的信道发送数据会引发程序恐慌（panic）。   

​     **还要注意：** 信道与文件不同，通常情况下无需关闭它们。只有在必须告诉接收者不再有需要发送的值时才有必要关闭，例如终止一个 `range` 循环。   



## 使用 GOMAXPROCS

https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/14.1.md#1413-%E4%BD%BF%E7%94%A8-gomaxprocs



# 14.12 链式协程

https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/14.12.md#1412-%E9%93%BE%E5%BC%8F%E5%8D%8F%E7%A8%8B



关于正则：

golang Compile 使用的是 RE2 正则，而不是 PCRE 正则，[RE2](https://github.com/google/re2/wiki/Syntax) 的前向断言语法跟 PCRE 不同。

`go doc regexp/syntax`



golang 支持多种正则，CompilePOSIX 方法就像 Compile，但将正则表达式限制为 POSIX ERE（egrep） 语法，并将匹配语义更改为最长。 [参考](https://cloud.tencent.com/developer/section/1144090#stage-100022830)

