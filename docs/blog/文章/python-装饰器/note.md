# 装饰器-python

:::tip
这是从我简书文章的搬运，我向自己申请了转载hh。
https://www.jianshu.com/p/b5b06e0e5302
:::

## 前言

行为：装饰器（decorator）可以对一个函数、方法或者类进行“加工”，相当于在封装。

目的：抽象化代码，利用函数是一等公民的特性来复用代码，人生苦短，赶紧偷懒。

须知：越高抽象速度可能越慢，毕竟函数的地址跳转也需要一丢丢时间。

---

## 本质和语法糖

其本质是**利用函数作为 python 中的一等公民的特性，可以作为变量来使用**，这时作为变量时其实传递的是其函数的引用（地址）。
> 也就是说，**只要是将函数当成一等公民的编程语言，其实都可以写装饰器**。

装饰器：
```py
def deco(func):
    def __funny():
        print("2")
        func() # 核心
        print("3333")
        return None # 注意返回 None
    return __funny

def foo():
    print("foo")

f = deco(foo) # 核心
n = foo()
print(n)
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-ef22b1d9a728b6d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 很直白的，首先将 foo 的引用传递给 deco 函数，然后 deco 函数将会返回一个 __funny() 的引用，所以最后 f 其实获取了 “__funny() 的引用”，也就是说 f() 就是 __funny()，在之后 n = f() 的调用将会得到 f() 的返回值，这里我返回了一个 None 值。

利用语法糖 @：
```py
def deco(func):
    def __funny():
        print("2")
        func() # 核心
        print("3333")
        return None # 注意返回 None
    return __funny

@deco
def foo():
    print("foo")

n = f()
print(n)
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-ef22b1d9a728b6d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

语法糖其实就是进行了 f = deco(foo) 的操作，一句话就是懒。

> 注意装饰器内部的 self 用于指明这是哪一个类的实例，所以j即使写在类外部也不能省略，因为实际运行会被暴露出来啦。

---

## 与默认参数和关键字参数的友好会晤

与默认参数和关键参数的友好结合，将会大大的提高灵活性，能够变得更加的懒惰。
```py
def deco(func):
    def inner(self, *argv, **kwargv):
        print("2")
        r = func(self, *argv, **kwargv)
        print("3333")
        return None
    return inner
class  Something():
    @deco
    def foo(self):
        print("foo")

a = Something()
print(a.foo())
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-ef22b1d9a728b6d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

## 来实际抽象一波

我曾经封装过一些 python 中的 SQL 方法，其中有一些非常无聊的操作：
```py
import MySQLdb

class MySqlSearch():
    def __init__(self):
        pass

    def get_conn(self):
        self.conn = MySQLdb.connect(
            # ...
        )

    def conn_close(self):
        if self.conn:
            self.conn.close()

    def get_one(self, order='id'):
        self.get_conn()
        # ...
        self.conn_close()
        return result

    def get_all(self, order='id'):
        self.get_conn()
        # ...
        self.conn_close()
        return result

    def get_by_page(self, page=1, page_size=10, order='id'):
        '''根据页面显示数据，默认第一页起算，一页有十行数据'''
        self.get_conn()
        # ...
        self.conn_close()
        return result


def main():
    obj = MySqlSearch()
    print(obj.get_one())
    print('-'*50)
    print(obj.get_all())
    print('-'*50)
    print(obj.get_by_page())


if __name__ == '__main__':
    main()
```
> 啊，十分明显的，为了不长时间占用与数据库的链接，每次我都需要开关数据库的链接，太麻烦了。

很明显，可以将开关数据库操作给封装掉：
```py
import MySQLdb

def mysql_open_close_decorator(func):
    def __foo(self):
        self.conn = MySQLdb.connect(
                    # ...
        )
        result = func(self) # 实际操作
        if self.conn:
            self.conn.close()
        return result
    return __foo

class MySqlSearch():
    def __init__(self):
        pass

    @mysql_open_close_decorator
    def get_one(self, order='id'):
        # ...
        return result

    @mysql_open_close_decorator
    def get_all(self, order='id'):
        # ...
        return result

    @mysql_open_close_decorator
    def get_by_page(self, page=1, page_size=10, order='id'):
        '''根据页面显示数据，默认第一页起算，一页有十行数据'''
        # ...
        return result


def main():
    obj = MySqlSearch()
    print(obj.get_one())
    print('-'*50)
    print(obj.get_all())
    print('-'*50)
    print(obj.get_by_page())


if __name__ == '__main__':
    main()
```

---

## 保留被装饰函数的元信息

问题：假设你写了装饰器来装饰一个函数，而我们运行时其实运行的是装饰器并在其中调用被装饰的函数，所以被装饰函数不是被直接调用的，这样一来重要的元信息比如函数名称、文档字符串、注解和参数签名等等信息都会不会被保留，此时我们能看到只有直接调用的装饰器的元信息。
```py
def deco(func):
     def __funny():
         '''装饰器的文档字符串'''
         print("2")
         func()  # 核心
         print("3333")
         return None  # 注意返回 None
     return __funny

@deco
def foo():
    '''被装饰函数的文档字符串'''
    print("foo")
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-dae721be4514ce7b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

装饰一个函数，核心在于这个函数而不是装饰器，所以我们更希望我们装饰过的函数能够保留所有的原始信息，可以自己写，但更推荐使用 functools 库提供的 @wraps 装饰器。
```py
from functools import wraps
def deco(func):
     @wraps(func) # @wraps 装饰器，注意传入被装饰函数来保留其元信息
     def __funny():
         '''装饰器的文档字符串 '''
         print("2")
         func()  # 核心
         print("3333")
         return None  # 注意返回 None
     return __funny

@deco
def foo():
    '''被装饰函数的文档字符串'''
    print("foo")
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-04ecd420d8b5a90f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
@wraps 有一个重要特点是它能让你通过属性 __wrapped__ 来直接访问被包装函数，比如上图中的 foo.__wrapped__()。
> functools 所提供的 wraps 作用于装饰器，保留被装饰函数的元信息和提供一份装饰器的代码副本。
