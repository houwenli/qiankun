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

  function getExternalScripts () {

  }

  function execScripts () {
    
  }

  return {
    template,
    getExternalScripts,
    execScripts
  }
}