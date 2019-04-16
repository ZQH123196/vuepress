# manjaro 日记
这是从我简书文章的搬运，我向自己申请转载。
## 系统引导文件不存在
问题描述：
GPT + UEFI 安装，结果没有 /boot/efi 文件，导致 Linux 无法引导，不得不使用 U 盘进行引导。

解决方案：
使用 manjaro 17.0 的镜像，Manjaro17.0 以上的版本引导程序不稳定，会造成没有引导文件，之后再进行系统升级就没问题了，哇偶这 BUG 真神奇，这引导程序是走下滑路线的么。
[历史版本地址](https://sourceforge.net/projects/manjarolinux/files/archive/)

---

## VScode
问题描述：
visual studio code 安装之后导致文件默认关联出现问题，点击菜单栏的文件夹无法被文件管理器打开，而是会被打开至 VScode 中，原有的文件夹关联被破坏。

解决方案：
修改  `/usr/share/applications/visual-studio-code.desktop`
将 `MimeType=text/plain;inode/directory;` 改为 `MimeType=text/plain;`

参考：
[MimeType](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_Types)
[GNOME 3: File Management Default Is Baobab](https://bbs.archlinux.org/viewtopic.php?id=151907)

---

## XMind
问题描述：
xmind 创建软连接无法启动

解决方案：
是引用自带库文件时出错，问题在于引入路径的 xmind.ini 文件，因此将内部的相对路径全部改为绝对路径即可解决。

---

## virtual box

注意要安装内核模块，否则找不到文件。
注意查看清楚自己的内核版本：
`uname -a`
查看 /lib/modules 位置下的模块是否正确，不行就全部删掉重下。
升级或重新安装一遍内核：`sudo pacman -Syu linux`

在上面确保的情况下，运行：
`sudo modprobe vboxdrv `

参考：
[VirtualBox_(简体中文)](https://wiki.archlinux.org/index.php/VirtualBox_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E5%9C%A8_Arch_%E9%87%8C%E5%AE%89%E8%A3%85_VirtualBox)

---

## 手动降级软件包
问题描述：
依赖 curl 的软件包（onedrive）出现链接问题，降级即可解决。

到 https://archive.archlinux.org/ 这里去找之前的软件包。

参考：
[issues/430](https://github.com/skilion/onedrive/issues/430)
例： curl 在 https://archive.archlinux.org/packages/c/curl/ 路径下。

下载下来， `sudo pacman -u package-name` 进行安装即可降级。

---

## 硬件问题
所有的硬件可以用 (Mhwd(manjaro hardware detection))[https://wiki.manjaro.org/index.php?title=Mhwd] 来处理。
> 这是 manjaro 上自带的包，arch 上没有，管理内核很方便，各个图形界面也内置了这个包的 GUI 界面。

---

## 系统日志

使用 (journalctl)[http://www.jinbuguo.com/systemd/journalctl.html] 来查看系统日志。
> 我的电脑的兼容性很差，这个系统日志经常占满我一个核的 CPU，看了日志，是驱动的问题，但是我还干不掉，更惨的是还不能整体降级，我真是头都大了！

---
## 挂载 ISO
从微软官网下载的 ISO 格式为 udf，使用以下命令进行挂载：
`sudo mount /home/eor/Downloads/Win10.iso /mnt/udf/  -t udf`

---

##　备份软件包

首先生成软件包列表：
```
pacman -Qqen > packages-repository.txt
pacman -Qqem > packages-AUR.txt
```
重新安装：
just use AUR, don't use pacman, that will broke your system.
remenber, at first your need to up your system.
```bash
// pacman --needed -S - < packages-repository.txt
cat packages-AUR.txt | xargs yay -S --needed --noconfirm
```
> 注意了，虽然可以将 pacman 的包给导入到系统，但最好别用，除非确定能够兼容，否则老版本的软件将会破坏新系统内部的引用，导致开不了机。最好只导入 AUR 软件包即可，小心崩崩崩！
常用 AUR 软件包 
```
baidupcs-go-git
bookworm-git
fcitx-sogoupinyin
google-chrome
netease-cloud-music
onedrive-abraunegg-git
typora
joplin
```
