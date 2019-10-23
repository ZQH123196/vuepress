# SQL、T-SQL 与 PL-SQL 的差异与迁移

根据工作需求，要将 Sybase 数据库上的存储过程迁移到 Oracle 上，二者使用了不同的语法。

比较二者语法的不同，做出记录以便更好的进行数据库迁移。





SQL语言是有ANSI标准的。但各个厂商实现的SQL语言，都没有完全遵循标准。并对标准SQL进行了诸如if之类的控制语句的扩展，就有了T-SQL，JetSQL、PL-SQL等，具体要依据你的数据库管理系统而定，SQLServer当然是使用T-SQL、Oracle使用PL-SQL，[Access](http://www.kokojia.com/list/245.html)使用JetSQL。

Microsoft SQL Server及Sybase(老牌数据库，被SAP收购后，变成很多个SAP的数据库)用的是“Transact-SQL”，简称“T-SQL”，意思是办理结构查询语言或事务型结构查询语言。



Sybase 的 SQL语句叫做 T-SQL（Transact Structured Query Language），是标准 SQL 语法 ANSI  SQL 的加强版，对 SQL 做了许多补足，提供了一些脚本的基本功能，如变量说明、流控制语言、功能函数等。



Oracle 的 SQL 语句叫做 PL-SQL（Procedural  Language-SQL），即过程化SQL语言，PL/SQL 是 Oracle 数据库对标准 SQL 语句的扩展。相较 T-SQL 而言，PL-SQL 的功能更多更接近于一门编程语言，可以编写复杂任务的 SQL 语句。

> PL-SQL 虽然强，但是没啥用，复杂任务还是应该用专门的编程语言来做，否则流通和维护性就比较低了，因为学这个的人很少。



SQL是Structrued Query  Language的缩写，即结构化查询语言。它是负责与ANSI（美国国家标准学会）维护的数据库交互的标准。作为关系数据库的标准语言，它已被众多商用DBMS产品所采用，使得它已成为关系数据库领域中一个主流语言，不仅包含数据查询功能，还包括插入、删除、更新和数据定义功能.

T-SQL是SQL语言的一种版本，且只能在SQL SERVER上使用。它是ANSI  SQL的加强版语言、提供了标准的SQL命令。另外，T-SQL还对SQL做了许多补允，提供了数据库脚本语言，即类似C、Basic和Pascal的基本功能，如变量说明、流控制语言、功能函数等。

PL-SQL（Procedural  Language-SQL）是一种增加了过程化概念的SQL语言，是Oracle对SQL的扩充。与标准SQL语言相同，PL-SQL也是Oracle客户端工具（如SQL*Plus、Developer/2000等）访问服务器的操作语言。它有标准SQL所没有的特征：变量（包括预先定义的和自定义的）；控制结构（如IF-THEN-ELSE等流控制语句）；自定义的存储过程和函数  ；对象类型等。由于 P/L-SQL  融合了SQL语言的灵活性和过程化的概念，使得P/L-SQL成为了一种功能强大的结构化语言，可以设计复杂的应用。





## 参考

* [T-SQL、Jet SQL、PL-SQL 有什么含义？](http://www.kokojia.com/article/26121.html)