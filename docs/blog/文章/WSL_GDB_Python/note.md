# WSL(Linux) 源码编译 gdb-8.1 带 python 支持

## 前言
系统：Ubuntu 16.4（WSL）
正常都不会需要升级 GDB 的，但如果是对新标准、新特性、新语言有要求的话，那就需要升级 GDB 了。
这次升级 GDB 是为了能够调试 Rust 程序，因为 Windows 下提供 GDB 太老了，而也明确不支持 Rust调试。
最新的 gdb 是 8.2，不过太新怕有 bug，我们上 gdb-8.1。

---

## 下载

下载到 D 盘：
```bash
eor@DESKTOP-CNB2LNA:/mnt/c/Users/admin$ cd /mnt/d/inbox/
eor@DESKTOP-CNB2LNA:/mnt/d/inbox$ wget http://ftp.gnu.org/gnu/gdb/gdb-8.1.1.tar.gz .
```
---

## 配置、编译、安装

> 如果不需要用到 Python 调试脚本，可以跳过 python-dev 和去除 -with-python=python3 的标志，因为这可能会导致失败。

带上 python 的开发环境，这是为了调试 Rust 而装的。
第一个是 python2 的，第二个是 python3 的，按需安装：
```bash
sudo apt-get install python-dev
sudo apt-get install python3-dev
sudo apt-get install texinfo # 这个必备
```

解压、配置、编译、安装
```bash
eor@DESKTOP-CNB2LNA:/mnt/d/inbox$ tar zxfv gdb-8.1.1.tar.gz
eor@DESKTOP-CNB2LNA:/mnt/d/inbox$ cd gdb-8.1.1/
eor@DESKTOP-CNB2LNA:/mnt/d/inbox/gdb-8.1.1$ ./configure -prefix=/usr/local/gdb -with-python=python3 && make && sudo make install
eor@DESKTOP-CNB2LNA:/mnt/d/inbox/gdb-8.1.1$ make clean
```
> -with-python=python3 这个选项很重要，因为我们要加载 Rust 自带的打印支持，这能让 GDB 更好的显示 Rust 程序信息。而 Rust 提供的打印支持是 Python 版本的，所以我们需要带上 Python。
>> 注意，这里的 python3 是已经安装了的 python3，请确保 python3 和 python3-dev 的存在。
>>> 我偷懒的将命令堆到一起，但不建议别人这样做。

耐心等待，可能比较久。

## 建立链接

由于安装时我们加上了前缀 -prefix=/usr/local/gdb，这将会把软件安装到 /usr/local/gdb 目录下，好处是卸载时只需要删除这个文件夹就可以了。
```bash
eor@DESKTOP-CNB2LNA:/mnt/d/inbox/gdb-8.1.1$ /usr/local/gdb/bin/gdb
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-dd02e5b850688e01.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

建立符号链接来方便的使用他:
```bash
sudo ln -s /usr/local/gdb/bin/gdb /usr/local/bin/
sudo ln -s /usr/local/gdb/bin/gcore /usr/local/bin/
sudo ln -s /usr/local/gdb/bin/gdbserver /usr/local/bin/
ls -al /usr/local/bin/
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-cfe19e93cb365193.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 检查 python 支持

在用户的主目录 ~ 下新建一个 .gdbinit 文件和 python 文件。
```bash
cd ~
touch hello.py
touch .gdbinit
```

hello.py 文件写入：
```py
import gdb
print('Hello gdb, I am python script.')
```

.gdbinit 文件写入：
```bash
source ~/hello.py
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-b774be6f29c595e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

出现这个说明 python 脚本导入成功了。

---

## 参考链接

[gdb 文档](https://sourceware.org/gdb/current/onlinedocs/gdb/Python.html#Python)

[PythonGdbTutorial](https://sourceware.org/gdb/wiki/PythonGdbTutorial)

[dev-python-gdb-support](https://devguide.python.org/gdb/#gdb-support)

[用 Python 拓展 GDB（一）](http://python.jobbole.com/85415/)

:::tip
这是从我简书文章的搬运，我向自己申请了转载hh。
:::