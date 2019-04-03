module.exports = {
  title: 'Hello !',
  description: '郑启华的技术文档',
  plugins: [['@vuepress/back-to-top'],['mathjax', {
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
      '/': genSidebarConfig('项目', '小项目', '动效', 'imitation', '文章', '迷思')
    },
    lastUpdated: '上次更新'
  },
  markdown: {
    toc: { includeLevel: [1, 2] },
    lineNumbers: true
  },
}
// VuePress 内置了基于 headers 的搜索 —— 它会自动为所有页面的标题、h2 和 h3 构建起一个简单的搜索索引。

function genSidebarConfig(title1, title2, title3, title4, title5, title6) {
  return [
    {
      title: title1,
      collapsable: false,
      children: [
        ``,
      ]
    },
    {
      title: title2,
      collapsable: false,
      children: [
        ``,
      ]
    },
    {
      title: title3,
      collapsable: false,
      children: [
        `/blog/${title3}/转轴展开照片墙/note`,
        `/blog/${title3}/魔方/note`,
        `/blog/${title3}/3D旋转轮播图/note`,
        `/blog/${title3}/小胡子/note`,
        `/blog/${title3}/翻页动画/note`,
        `/blog/${title3}/书籍展示/note`,
        `/blog/${title3}/3D环绕球/note`,
        `/blog/${title3}/弹出层/note`,
        `/blog/${title3}/CSS\ day\ 1/note`,


      ]
    },
    {
      title: title4,
      collapsable: true,
      children: [
        `/blog/${title4}/callapply/note`,
        `/blog/${title4}/bind/note`,
      ]
    },
    {
      title: title5,
      collapsable: false,
      children: [
        `/blog/${title5}/搜索框设计/note`,
        `/blog/${title5}/CSS-matrix/note`,
        `/blog/${title5}/defineProperty/note`,
        `/blog/${title5}/Koa2/note`,
        `/blog/${title5}/Koa2/note1`,
      ]
    },
    {
      title: title6,
      collapsable: true,
      children: [
        `/blog/thinking/标准与规范/note.md`,
      ]
    }
  ]
}