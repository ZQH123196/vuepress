# 学生成绩管理系统-Django-基本功能

:::tip
这是从我简书文章的搬运，我向自己申请了转载hh。
https://www.jianshu.com/p/3a9ccbda2dcf
:::

## 前言：

帮忙写一个成绩管理系统，哇......
要求：
1.  能按班级、按课程完成对学生成绩的增删改查；
2.  能按班级、按课程统计学生的成绩，能求总分、平均分，课程的不及格人数等；
3.  能按班级、按课程对学生的成绩进行排序；
4.  能查询某名学生的成绩。
嗯~ o(*￣▽￣*)o，不管怎么看这都像是存粹的数据库操作。

python 自带 sqlite3，而且后台傻瓜式操作数据库，最简单，就这个。

技术选型：Python3.6+Django2.x+Xadmin2.x

参考：
* [Django docs](https://docs.djangoproject.com/en/2.1/)
* [xadmin](https://github.com/sshwsfc/xadmin)
* [学生信息管理系统](https://www.cnblogs.com/v88v/p/8886764.html) 这篇写好哦


---

## 环境搭建

安装，当然是跳过啊！

最后面有详细依赖库，自己安装去。

---

## 初始化操作

```sh
D:\PRJ\student_management\Django_simple (master -> origin)
(py36) λ django-admin.exe startproject Django_simple # 
D:\PRJ\student_management\Django_simple (master -> origin)
(py36) λ python manage.py startapp app
D:\PRJ\student_management\Django_simple (master -> origin)
(py36) λ mkdir templates && mkdir static
D:\PRJ\student_management\Django_simple (master -> origin)
(py36) λ python manage.py migrate
```
初始目录树：
```sh
eor@DESKTOP-CNB2LNA:/mnt/d/PRJ/student_management/Django_simple$ tree -L 2 --filelimit 20
.
├── app
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── db.sqlite3
├── Django_simple
│   ├── __init__.py
│   ├── __pycache__
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── static
└── templates

```
往 setting.py 添加模块，注意添加自己的模块，否则无法导入数据库：
```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'xadmin',
    'crispy_forms',
    'app',
]
```

---

## 测试 xadmin 是否抽风

作为后台管理系统，我们需要一个管理员，否则登陆不进去，新建管理员：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-dedc313253f97194.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
登陆成功
![image.png](https://upload-images.jianshu.io/upload_images/5690889-e071f3cd1043743a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

## 添加中文支持

往 setting.py 中导入
```sh
from django.utils.translation import ugettext_lazy as _
```
然后修改 LANGUAGE_CODE 和 LANGUAGES：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-7d392ec4443dae87.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
结果：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-c0fb39136330872e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

参考：[广告DN](https://blog.csdn.net/xman1123/article/details/75311326)

---

## 使用数据库

修改 models.py：
```py
from django.db import models

# verbose_name 作为说明注释使用，可用于 csv 导出
class Student(models.Model):
    name = models.CharField(verbose_name='姓名', max_length=50)
    sex = models.CharField(verbose_name='性别', max_length=50)
    age = models.IntegerField(verbose_name='年龄')
    address = models.CharField(verbose_name='家庭住址', max_length=250)
    enter_date = models.DateField(verbose_name='入学时间')
    remarks = models.TextField(verbose_name='备注', blank=True)

```
需要明白的是，这里创建的是单个人物的数据模型，之后 Django 就能通过这个样板模型来进行数据的创建。

更新数据库：
```sh
D:\PRJ\student_management\Django_simple (master -> origin)
(py36) λ python manage.py makemigrations && python manage.py migrate
```
> 每次更改 models.py 都要运行一次 python manage.py makemigrations 和 python manage.py migrate。

啊，本质上 orm 就是将原本直接硬写的 sql 语句换成了 python 语句来写，这样我们就不需要记忆那些难记的 sql 语句了，但是也因为换成了 py 语句，所以我们需要手动对我们的 py 语句进行检测改动，然后被 orm 转换，最后作用于数据库。

SQLiteStudio 查看更改：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-2763172496eb7967.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

## 编写控制台信息

控制台由 admin.py 控制，最后用 xadmin.site.register 来注册上去。
```py
# from django.contrib import admin
import xadmin
from app.models import *

class StudentsAdmin():
    list_display = ('name', 'sex', 'age', 'address', 'enter_date', 'remarks',)

xadmin.site.register(Student, StudentsAdmin)
```

---

## 上传图片、附件，仅限开发环境

添加相关目录到 setting.py：
```py
# 以下仅限开发环境，这不适合生产使用！
# 媒体文件根目录
MEDIA_URL = '/media/' # 网站的访问路径
MEDIA_ROOT = os.path.join(BASE_DIR, 'media') # MEDIA_ROOT 为提供图片的路径
```
往 models.py 的内 student 类新加入一个图片属性并设置 upload_to，这将会被解释为数据库上传图片：
```py
class Student(models.Model):
    name = models.CharField(verbose_name='姓名', max_length=50)
    sex = models.CharField(verbose_name='性别', max_length=50)
    age = models.IntegerField(verbose_name='年龄')
    address = models.CharField(verbose_name='家庭住址', max_length=250)
    enter_date = models.DateField(verbose_name='入学时间')
    remarks = models.TextField(verbose_name='备注', blank=True)
    pass
    def path_photo(self, filename):
        return os.path.join('photo', '%s_%s' % (self.name, self.sex))
    photo = models.ImageField(verbose_name='照片', upload_to=path_photo, blank=True, null=True) # upload_to指定图片上传的途径，如果不存在则自动创建
```

编写 urls.py：
```py
from django.contrib import admin
from django.urls import path
import xadmin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path(r'', xadmin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
注意

> 此辅助函数仅在调试模式下有效，并且仅当给定前缀是本地（例如/media/）而不是URL（例如 http://media.example.com/）时才有效。

配置完 Django 的后台管理页面就会自动显示上传图片的功能，网站访问时的相对路径则由 MEDIA_URL 提供。
> 真素神奇，就跟配置文件一样，这里面 TM 发生了什么？

测试：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-7c90cb75e4bb88a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[下一篇章](https://www.jianshu.com/p/5a788822e222)

---

## 导出依赖库

不给完整依赖库的都是大坑，节省时间乃是大事。

导出依赖库：
```sh
D:\PRJ\student_management\Django_simple (master -> origin)
(py36) λ pip freeze > requirements.txt
```
安装依赖：
```sh
pip install -r requirements.txt
```
看一眼，可以复制下来存到自己的 requirements.txt 里面安装：
```sh
D:\PRJ\student_management\Django_simple (master -> origin)
(py36) λ cat requirements.txt
asn1crypto==0.24.0
astroid==2.0.1
autopep8==1.3.5
certifi==2018.8.13
cffi==1.11.5
colorama==0.3.9
cryptography==2.2.2
diff-match-patch==20121119
Django==2.1
django-crispy-forms==1.7.2
django-filter==2.0.0
django-formtools==2.1
django-import-export==1.0.1
django-reversion==3.0.0
djangorestframework==3.8.2
et-xmlfile==1.0.1
future==0.16.0
httplib2==0.9.2
idna==2.7
isort==4.3.4
jdcal==1.4
Jinja2==2.10
lazy-object-proxy==1.3.1
Markdown==2.6.11
MarkupSafe==1.0
mccabe==0.6.1
mysqlclient==1.3.13
odfpy==1.3.6
openpyxl==2.5.5
Pillow==5.2.0
pycodestyle==2.4.0
pycparser==2.18
pylint==2.0.1
PyMySQL==0.9.2
pytz==2018.5
PyYAML==3.13
six==1.11.0
tablib==0.12.1
typed-ast==1.1.0
unicodecsv==0.14.1
wincertstore==0.2
wrapt==1.10.11
xadmin==2.0.1
xlrd==1.1.0
xlwt==1.3.0
```

