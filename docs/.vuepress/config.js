module.exports = {
  title: 'Hello !',
  description: '郑启华的技术文档',
  plugins: [['@vuepress/back-to-top'], ['mathjax', {
    target: 'chtml', //'svg' | 'chtml',默认 chtml
    macros: {
      '\\Z': '\\mathbb{Z}',
    },
  }]],
  themeConfig: {
    nav: [{
      text: '文档',
      link: '/'
    },
    {
      text: '联系',
      link: '/contact/'
    },
    ],
    sidebar: {
      '/': genSidebarConfig("./docs")
    },
    lastUpdated: '上次更新'
  },
  markdown: {
    lineNumbers: true
  },
}
// VuePress 内置了基于 headers 的搜索 —— 它会自动为所有页面的标题、h2 和 h3 构建起一个简单的搜索索引。

// docs 主文档
// docs/blog 第一阶，博客
// docs/blog/collections 第二阶，title 的集合
// docs/blog/collections/title 第三阶，文档标题
// docs/blog/collections/title/file 第四阶，实际文档和相关文件，实际文档为 note.md 
function genSidebarConfig(docsPath) {
  // 遍历内部全部文件夹，并存下来备用，后续任何事情都可以依靠这些完整的数据解决
  // 一个 title 名生成一个数组，此数组将交付给 children
  // todo 0. 数据驱动，由 blog 内部的文件夹来决定 title 的数量，每多一个文件夹就会自动创建一个 title
  const path = require("path");
  const fs = require("fs");
  let allFloor = {
    first: [],
    second: [],
    third: [],
    fourth: []
  }

  let firstStair = path.resolve(path.join(docsPath + "/blog/"));
  allFloor.first.push(firstStair)

  fs.readdir(firstStair, (err, collections) => {
    console.log(collections)
    for (let i of collections) {
      if (!(fs.statSync(i).isDirectory())) { continue }
      let secondStair = path.join(firstStair, collection);
      allFloor.second.push(secondStair)

      // fs.readdir(secondStair, (err, titleDirs) => {
      //   if (err) { console.log(err) }
      //   for (let j of titleDirs) {
      //     if (fs.stat(j))
      //     let title = path.join(secondStair, titleDir);
      //     allFloor.third.push(title)
      //     fs.readdir(title, (err, files) => {
      //       if (err) { console.log(err) }
      //       for (let fileName of fileNames) {
      //         // 判定是否是 note.md
      //         if (fileName === "note") {
      //           let _ = path.join(title, fileName)
      //           allFloor.fourth.push(_)
      //         }
      //       }
      //     })
      //   }
      // })
    }
  })
  console.log(allFloor)

  // 将内部啥都没有的剔除
  childrenList = childrenList.filter((element) => {
    if (element.length === 0) {
      return false;
    }
    return true;
  })
  let result = [];
  for (let children of childrenList) {
    let obj = {}
    // children[0],[1],[2] 都一样
    obj.title = /.*blog\/(.*)\//.exec(children[0])[1]
    obj.collapsable = true
    obj.children = children
    result.push(obj)
  }
  console.log(result)
  return result
  // [
  //   {
  //     title: titles[0],
  //     collapsable: false,
  //     children: [
  //       ``,
  //     ]
  //   },
  //   {
  //     title: titles[1],
  //     collapsable: false,
  //     children: [
  //       ``,
  //     ]
  //   },
  //   {
  //     title: titles[2],
  //     collapsable: false,
  //     children: [
  //       `/blog/${titles[2]}/转轴展开照片墙/note`,
  //       `/blog/${titles[2]}/魔方/note`,
  //       `/blog/${titles[2]}/3D旋转轮播图/note`,
  //       `/blog/${titles[2]}/小胡子/note`,
  //       `/blog/${titles[2]}/翻页动画/note`,
  //       `/blog/${titles[2]}/书籍展示/note`,
  //       `/blog/${titles[2]}/3D环绕球/note`,
  //       `/blog/${titles[2]}/弹出层/note`,
  //       `/blog/${titles[2]}/CSS\ day\ 1/note`,


  //     ]
  //   },
  //   {
  //     title: titles[3],
  //     collapsable: true,
  //     children: [
  //       // `/blog/${title4}/callapply/note`,
  //       // `/blog/${title4}/bind/note`,
  //     ]
  //   },
  //   {
  //     title: titles[4],
  //     collapsable: false,
  //     children: [
  //       `/blog/${titles[4]}/搜索框设计/note`,
  //       `/blog/${titles[4]}/CSS-matrix/note`,
  //       `/blog/${titles[4]}/defineProperty/note`,
  //       `/blog/${titles[4]}/Koa2/note`,
  //       `/blog/${titles[4]}/Koa2/note1`,
  //       `/blog/${titles[4]}/数据劫持/note`,
  //       `/blog/${titles[4]}/Proxy\&Reflect/note`,
  //       `/blog/${titles[4]}/ES5\ 模拟\ Class/note`,
  //     ]
  //   },
  //   {
  //     title: titles[5],
  //     collapsable: true,
  //     children: [
  //       `/blog/thinking/标准与规范/note.md`,
  //     ]
  //   }
  // ]
}