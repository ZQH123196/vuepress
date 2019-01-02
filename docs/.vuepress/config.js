module.exports = {
  title: 'Hello !',
  description: '郑启华的技术文档',
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
        ['/blog/one', 'one'],
        ['/blog/two', 'text']
      ],
    }
  },
  lastUpdated: 'Last Updated', // string | boolean
}