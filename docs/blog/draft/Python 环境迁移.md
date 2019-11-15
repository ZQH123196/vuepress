# Python 环境内网迁移



情况：

1. 需要在 win7 开发机部署 python 环境
2. 开发机处于内网，并且没有部署私有 Python 仓库



方案：

1. 利用 pip 下载本地包进行迁移
2. 利用 conda 直接复制虚拟环境
3. 利用的 docker



方案二需要一个完整的 Python 开发环境来复制，由于所有的包都已经被安装会显得很大，而我不希望上传到开发环境 SVN 的压缩包太大，所以舍弃。

方案三理论上是最简单，只要 docker 能跑就全部 OK，但我并没有 win7 部署 docker 的经验，win7 对 docker 的兼容性跟 win10 不能比，不确定那些依赖包会被遗漏，我更倾向于一次搞定。



方案一相当于重新在开发机安装 python 在重新安装那些第三方包，这样上传的压缩包不会很大，而且重新安装也可以避免一些古古怪怪的问题。

选择方案一。





## 利用 pip 将开发环境迁移内网

人物简介：

个人机：个人的机子，可以连接外网

内网机：内网的机子，不可以连接外网



### 个人机的操作

conda 创建一个虚拟环境

```sh
conda create -n py3
activate py3
```



进入虚拟环境，确定虚拟环境的 pip 是否正确

冲正，去除原本已经有的，否则有些东西会出现问题，比如 jupyter 可能出现导致了找不到 win32api 的 bug。

切换 pip 的源为国内源，这里用的是清华的 pypi 源，然后将需要迁移的包安装上。

```sh
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip install jupyterlab
pip install gdbgui
pip install httpie
...
```

将虚拟环境的包列表用 pip 导出来，然后再用 pip 将安装包都下载到一个指定的文件，如果缓存还在的会直接复制已经下载的缓存。

```sh
pip freeze > requirements.txt
pip download -r requirements.txt -d ".\whls"
```



### 内网机的操作



将包列表和本地包以及一个 miniconda(用于提供虚拟环境和 PY3) 放到内网机

然后安装 miniconda，利用 miniconda 离线创建一个虚拟环境，然后离线安装虚拟环境的 pip

```sh
conda create -n py3 --offline
conda install pip -n py3 --offline
```

进入虚拟环境，确认 pip 是虚拟环境的 pip，利用 pip 导入包列表并指定来源路径：

```sh
pip --version
pip install --no-index --find-links="你存放的路径\whls" -r requirements.txt
```

> 如果你没有安装虚拟环境的 pip，这些包就会安装到你 conda 的宿主 Python 环境下了。
>
> > 注意 powershell 进不了虚拟环境，windows 用 cmd 进。

## 参考

* [在断网情况下完成Anaconda虚拟环境安装](https://blog.csdn.net/qq_39757145/article/details/91411592)