module.exports = {
  title: 'Hello !',
  description: '郑启华的技术文档',
  plugins: ['@vuepress/back-to-top'],
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
      '/': [
        ['/', '首页'],
        '/blog/one',
        ['/blog/two', 'text']
      ]
    }
  },
  markdown: {
    lineNumbers: true
  },
  lastUpdated: 'Last Updated', // string | boolean
}
// VuePress 内置了基于 headers 的搜索 —— 它会自动为所有页面的标题、h2 和 h3 构建起一个简单的搜索索引。