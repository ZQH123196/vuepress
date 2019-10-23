AOT是"Ahead Of Time"的缩写



## JIT 编译

Java  程序最初是仅仅通过解释器解释执行的，即对字节码逐条解释执行，这种方式的执行速度相对会比较慢，尤其当某个方法或代码块运行的特别频繁时，这种方式的执行效率就显得很低。于是后来在虚拟机中引入了  JIT 编译器（即时编译器），当虚拟机发现某个方法或代码块运行特别频繁时，就会把这些代码认定为“Hot Spot  Code”（热点代码），为了提高热点代码的执行效率，在运行时，虚拟机将会把这些代码编译成与本地平台相关的机器码，并进行各层次的优化，完成这项任务的正是  JIT 编译器。

现在主流的商用虚拟机（如Sun HotSpot、IBM J9）中几乎都同时包含解释器和编译器（三大商用虚拟机之一的 JRockit  是个例外，它内部没有解释器，因此会有启动相应时间长之类的缺点，但它主要是面向服务端的应用，这类应用一般不会重点关注启动时间）。二者各有优势：当程序需要迅速启动和执行时，解释器可以首先发挥作用，省去编译的时间，立即执行；当程序运行后，随着时间的推移，编译器逐渐会返回作用，把越来越多的代码编译成本地代码后，可以获取更高的执行效率。解释执行可以节约内存，而编译执行可以提升效率。

HotSpot 虚拟机中内置了两个JIT编译器：Client Complier 和 Server Complier，分别用在客户端和服务端，目前主流的 HotSpot 虚拟机中默认是采用解释器与其中一个编译器直接配合的方式工作。

运行过程中会被即时编译器编译的“热点代码”有两类：

- 被多次调用的方法。
- 被多次调用的循环体。

两种情况，编译器都是以整个方法作为编译对象，这种编译也是虚拟机中标准的编译方式。要知道一段代码或方法是不是热点代码，是不是需要触发即时编译，需要进行 Hot Spot Detection（热点探测）。





## 参考

* [javac 编译与 JIT 编译](http://wiki.jikexueyuan.com/project/java-vm/javac-jit.html)
* [比较编译技术](https://www.ibm.com/developerworks/cn/java/j-rtj2/index.html)
* [IBM 文档](https://www.ibm.com/support/knowledgecenter/zh/SSYKE2_7.0.0/com.ibm.java.zos.70.doc/diag/understanding/jit_overview.html)

* [大方法的执行过程及其调优](http://jm.taobao.org/2010/12/05/552/)