import { getApps } from './index'

export const handleRouter = async function () {
    console.log('开始处理router')
    // 2、匹配子应用
    // 获取路径
    let pathname = window.location.pathname || ''
    // 从apps中查找
    let apps = getApps()
    let app = apps.find(item => {
        return pathname.startsWith(item.activeRule)
    })
    if (!app) {
        return
    }
    // 3、加载子应用
    // 请求加载子应用的entry，其实是为了把html请求过来
    let html = await fetch(app.entry).then(res => res.text())
    const container = document.querySelector(app.container)
    // 子应用渲染需要通过执行js渲染页面
    // innerHTML 不会加载html中的script，浏览器的安全考虑
    // 这时候需要我们自己手动加载执行
    // eval 或者 new function()
    container.innerHTML = html
    // 4、渲染子应用
    
}