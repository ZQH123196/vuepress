const path = require("path");
const fs = require("fs");
// VuePress 内置了基于 headers 的搜索 —— 它会自动为所有页面的标题、h2 和 h3 构建起一个简单的搜索索引。
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
	// title 就在 second 层级
	let titles = allFloor.second.map((val) => {
		console.log(val)
		return /.*blog\/([^/]*)\/?.*/.exec(val)[1]
	})
	// console.log(titles)
	// 进行数据裁剪，绝对路径 vuepress 解析不了
	let fourthStair = allFloor.fourth.map((val) => {
		return val.replace(/.*docs/, "")
	});
	let result = [];
	for (let i = 0; i < titles.length; i++) {
		let re = new RegExp(`.*blog/${titles[i]}/?.*`)
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
		if(result[i].children.length === 0) result[i].children = []
	}
	
	return result
}

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
	return allFloor
}

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