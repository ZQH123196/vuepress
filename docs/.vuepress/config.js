const path = require("path");
const process = require("process");
const fs = require("fs");
const os = require('os');
// VuePress 内置了基于 headers 的搜索 —— 它会自动为所有页面的标题、h2 和 h3 构建起一个简单的搜索索引。
module.exports = {
  title: 'Hello !',
  description: '郑启华的技术文档',
  head: [
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' }],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js' }],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }],
    ['link', {rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css", integrity: "sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j", crossorigin: "anonymous"}],
    ['script', { src: "https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.js", integrity: "sha384-9Nhn55MVVN0/4OFx7EE5kpFBPsEMZxKTCnA+4fqDmg12eCTqGi6+BB2LjY8brQxJ", crossorigin: "anonymous"}]
  ],
  plugins: [
    ['@vuepress/back-to-top'],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-138235740-1' // UA-00000000-0
      }
    ], 
  ],
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
      '/': getSidebarConfig("./docs")
    },
    lastUpdated: '上次更新'
  },
  markdown: {
    lineNumbers: true
  },
}

function getSidebarConfig(docsPath) {
  let allFloor = getAllFloor(docsPath)
  // console.log(allFloor)
  // title 就在 second 层级
  let linuxReg = new RegExp(String.raw`.*blog/(.*)$`);

  // console.log(allFloor.second)
  let titles = allFloor.second.map((val) => {
    return linuxReg.exec(val)[1]
  })

  // 发布环境忽略
  if (process.env.NODE_ENV === 'publish') {
    let ignoreTitles = ['draft', '草稿', 'tmp']
    titles = titles.filter(val => ignoreTitles.indexOf(val) === -1)
  }

  // 进行数据裁剪，绝对路径 vuepress 解析不了
  let fourthStair = allFloor.fourth.map((val) => {
    return val.replace(/.*docs/, "")
  });
  // console.log(fourthStair)
  let result = [];


  for (let i = 0; i < titles.length; i++) {
    let linuxStyle = String.raw`.*blog/${titles[i]}/.*`;
    let winStyle = String.raw`.*blog\\迷思\\.*`;
    let re = new RegExp(linuxStyle)
    // console.log(titles[i])
    result.push({
      title: titles[i],
      collapsable: false
    })
    result[i].children = fourthStair.filter((val) => {
      if (re.test(val)) {
        return true
      }
      return false
    })
    // console.log(result)
    if (result[i].children.length === 0) result[i].children = []
  }

  // 手动排队
  result.push(result.shift());``

  return result
}

// 强制无论任何平台，强制使用 Linux 风格分隔符 /
// docs 主文档
// docs/blog 第一阶，博客
// docs/blog/collections 第二阶，title 的集合
// docs/blog/collections/title 第三阶，文档标题
// docs/blog/collections/title/file 第四阶，实际文档和相关文件，实际文档为 note.md 
function getAllFloor(docsPath) {
  docsPath = path.resolve(docsPath)
  let allFloor = {
    first: [],
    second: [],
    third: [],
    fourth: []
  }

  let firstStair = path.join(docsPath, "blog");
  allFloor.first.push(firstStair)

  let collections = fs.readdirSync(firstStair)
  for (let collection of collections) {
    let collectionPath = path.join(firstStair, collection)
    // 过滤非文件夹的路径
    if (!(fs.statSync(collectionPath).isDirectory())) { continue }
    allFloor.second.push(collectionPath)

    let titleDirs = fs.readdirSync(collectionPath)
    for (let titleDir of titleDirs) {
      let titleDirPath = path.join(collectionPath, titleDir)
      // 过滤非文件夹的路径
      if (!(fs.statSync(titleDirPath).isDirectory())) { continue }
      allFloor.third.push(titleDirPath)

      let files = fs.readdirSync(titleDirPath)
      for (let file of files) {
        // 只允许名称为 note.md 的通过
        if (file !== "note.md") { continue }
        let filePath = path.join(titleDirPath, file)
        allFloor.fourth.push(filePath)
      }
    }
  }

  if (os.platform() === 'win32'){
    allFloor.first = allFloor.first.map( (valStr) => { return valStr.replace(/\\/g, '/') })
    allFloor.second = allFloor.second.map( (valStr) => { return valStr.replace(/\\/g, '/') })
    allFloor.third = allFloor.third.map( (valStr) => { return valStr.replace(/\\/g, '/') })
    allFloor.fourth = allFloor.fourth.map( (valStr) => { return valStr.replace(/\\/g, '/') })
  }
  return allFloor
}