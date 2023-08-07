// 在qiankun中使用的是import-html-entry这个库，
// 实际上的作用就是把html作为入口
// 返回template模板字符串
// getExternalScripts获取js脚本
// getExternalStyleSheets获取css脚本
// execScripts执行css脚本

import { fetchResource } from "./fatch-resource"

// 自定义简写一下这个库
export const importHTML = async (url) => {
  const template = document.createElement('div')
  const html = await fetchResource(url)
  template.innerHTML = html

  // 获取所有script标签
  function getExternalScripts () {
    const scripts = template.querySelectorAll('script')
    return Promise.all(Array.from(scripts).map(script => {
      let src = script.getAttribute('src')
      // 两种格式，一种是外链js文件，一种是行内js
      if(!src) {
        return script.innerHTML
      } else {
        // 获取链接时要注意是相对链接
        return fetchResource(url + src)
      }
    }))
  }

  // 执行script代码
  async function execScripts () {
    let scripts = await getExternalScripts()

    let module = {exports : {}}
    let exports = module.exports

    scripts.forEach(script => {
      eval(script)
    })

    // console.log('subone-app', module.exports)

    // 如果这样做，肯定不合理，我们需要知道每个子应用导出的模块名字
    // return window['subone-app']

    // 构造commonjs环境
    return module.exports
  }

  return {
    template,
    getExternalScripts,
    execScripts
  }
}