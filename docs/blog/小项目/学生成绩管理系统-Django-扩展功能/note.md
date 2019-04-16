# 学生成绩管理系统-Django-扩展功能

:::tip
这是从我简书文章的搬运，我向自己申请了转载hh。
https://www.jianshu.com/p/5a788822e222
:::

## 前言：

[基本功能](/blog/小项目/学生成绩管理系统-Django-基本功能/note.md)已经走通，剩下的无非就是将其扩展直至符合需求罢了。

参考：
* [学生信息管理系统](https://www.cnblogs.com/v88v/p/8909845.html)

要求：
1.  能按班级、按课程完成对学生成绩的增删改查；
2.  能按班级、按课程统计学生的成绩，能求总分、平均分，课程的不及格人数等；
3.  能按班级、按课程对学生的成绩进行排序；
4.  能查询某名学生的成绩。

---

## 班级模块

在添加一个类到 models.py 去:
```py
class Class(models.Model):
    class_name = models.CharField(verbose_name='班级', max_length=100)
```
一个班级 N 个学生，那就是一对多啦，往 Student 类丢一个外键：
```py
class_name = models.ForeignKey(Class, verbose_name='所在班级', on_delete=models.CASCADE, blank=True, null=True)
```

将数据注册进后台系统，往 admin.py 中添加：

```py
class ClassAdmin():
    list_display = ('class_name',)
xadmin.site.register(Class, ClassAdmin)
```

测试：

![image.png](https://upload-images.jianshu.io/upload_images/5690889-b6fd935dc10f9b87.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/5690889-71d9735de8a35147.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在学生加入班级的界面有 bug，名字的显示不友好，应该是班级的名称而不是什么 Class object(1)。

瞧了瞧，这瓜皮的名字，这该不会就是类实例的打印吧？改一波实例的字符串显示：
```py
class Class(models.Model):
    class_name = models.CharField(verbose_name='班级', max_length=100)
    def __str__(self):
        return self.class_name
```

测试：

![image.png](https://upload-images.jianshu.io/upload_images/5690889-a1595403b37eb0d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

居然成功了，真素神奇。

---

## 课程模块

一个学生 N 门课，一个课 N 个学生，那就是多对多啦，往 Student 类丢一个 ManyToManyField：
```py
subjects = models.ManyToManyField(Subject, verbose_name='选修课程', blank=True)
```
注意要重启开发服务器才能创建新的数据表。

测试：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-fdc9fd08df701ce3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

## 创建教师模块

先加入模型：
```py
class Teacher(models.Model):
    name = models.CharField(verbose_name='教师姓名', max_length=50)
    def __str__(self):
        return self.name
```
建立与班级联系，一个班只能有一个班主任，建一对一的联系，建立在 Class 类：
```py
    headteacher = models.OneToOneField(Teachers, on_delete=models.CASCADE, verbose_name='班主任', blank=True, null=True)
```
> 注意一对一关系的级联删除，当删除主表的数据时候从表中的数据也随着一起删除。
最后注册进后台：
```py
class TeacherAdmin(object):
    list_display = ('name',)

xadmin.site.register(Teacher, TeacherAdmin)
```
测试班主任功能：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-c3f781e602c7b295.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/5690889-f1364f310b85fd45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

## 成绩模块

随便搞搞吧，就两步。
第一步，添加进 models：
```py
class ExamReport(models.Model):
    student = models.ForeignKey(to=Student, on_delete=models.CASCADE, verbose_name='学生名称')
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE, verbose_name='所选科目')
    exam_score = models.IntegerField(verbose_name='考试成绩')
    class Meta:
        db_table = ''
        managed = True
        verbose_name = '成绩'
        verbose_name_plural = '成绩集'
    def __str__(self):
        return "%s的%s的成绩" % (self.student.name, self.subject.name)
```
第二步，注册进后台：
```py
class ExamReportAdmin():
    list_display = ('student', 'subject', 'exam_score')

xadmin.site.register(ExamReport, ExamReportAdmin)
```

![image.png](https://upload-images.jianshu.io/upload_images/5690889-eee71bc412c8c4bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

## 查

增删改就算了，网页上傻瓜化操作了已经，但是查询功能由于涉及数据库的范围，需要我们自己设定。
往 admin.py 的 StudentAdmin 类加入搜索框，这里我们设定可以根据学生的名字、班级和选修课来搜索：
```py
search_fields = ('name', 'class_name__class_name', 'subjects__name')
```
> 在使用 Django admin 系统中的搜索时可能会出现“related Field has invalid lookup: icontains”错误，主要原因是外键查询是需要指定相应的字段的。外键不应该只是一个model，而该是另一个表的明确的一个字段。所以我们需要指定特定的字段 "本表外键字段__外键所在表需查询字段"。

![image.png](https://upload-images.jianshu.io/upload_images/5690889-4e9fdd523cadf01c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
搜索 “一年三班”：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-a5280b4bb9ae6449.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

成了，其他的慢慢把搜索按需求加上就 OK 了。

---

## 下拉选择--人性化修饰

很多东西是一个被局限的集合，比如性别就只能有三种，科目只能有 n 种，老师的身份只能有 n 种，这时候可以提供个方便下拉来快速选择。
下拉的实现在 Dajngo 中很简单，就是往模型加一个 choices 的选项，这样在后台生成数据时就会自动生成下拉框啦。
```py
    SEX = (
        ('male', '男'),
        ('female', '女')
    )
    sex = models.CharField(choices=SEX, verbose_name='性别', max_length=50)
```
> 注意 choices 的要求：'choices' must be an iterable containing (actual value, human readable name) tuples.

测试：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-30ca10ea934a12f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---

## 自定义管理界面--人性化修饰

Django 后台管理系统的信息由 Class Mate 定义，比如自定义 Students 的名字为中文：
```py
    class Meta:
        db_table = ''
        managed = True
        verbose_name = '学生'
        verbose_name_plural = '学生集'
```
但是更新数据库时跳错：
```sh
django.db.utils.NotSupportedError: Renaming the 'app_class' table while in a transaction is not supported on SQLite because it would break referential integrity. Try adding `atomic = False` to the Migration class.
```
这倒是直白，就是 SQLite 数据库不支持重命名的操作，添加`atomic = False`即可，emmmm......

好，改！
Migration 在 \py36\Lib\site-packages\django\db\migrations\migration.py 的位置，看 49 行：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-99ee83117d22a975.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
改成 False：
```py
atomic = False
```
再怼：
![image.png](https://upload-images.jianshu.io/upload_images/5690889-68005c5d7d24bcba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
成了。

---

## 定制网站信息--人性化修饰

修改登陆界面的标题，怼到 admin.py 里面去：
```py
from xadmin.views.website import LoginView

class LoginViewAdmin(LoginView):
    title = '学生信息管理系统'

xadmin.site.register(LoginView, LoginViewAdmin)
```
![image.png](https://upload-images.jianshu.io/upload_images/5690889-99b3ec9118b6d226.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

修改后台管理页面左上角的信息和低下的版权信息：
```py
from xadmin.views import CommAdminView

class GlobalSetting(CommAdminView):
    # 左上角及浏览器标题
    site_title = '学生信息管理系统'
    # 页脚版权信息
    site_footer = 'Copyright © 2018 eor'

xadmin.site.register(CommAdminView, GlobalSetting)
```
> 其实可以直接更改模板来着，毕竟这些也是根据模板生成的，不过这样修改集中到 admin.py 感觉还不错。

---

## 导出依赖文件

```sh
D:\PRJ\student_management\Django_simple (master -> origin)
(py36) λ pip freeze > requirements.txt

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

