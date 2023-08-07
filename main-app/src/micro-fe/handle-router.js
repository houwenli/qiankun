import { importHTML } from './import-html'
import { getApps } from './index'
import {getPreRoute, getCurRoute} from './rewrite-router'

export const handleRouter = async function () {
    console.log('开始处理router')

    let apps = getApps()
    // 获取preRoute
    let preRoute = getPreRoute()
    let preApp = apps.find(item => {
        return preRoute.startsWith(item.activeRule)
    })
    if(preApp) {
        await unmount(preApp)
    }
    
    // 获取curRoute
    let curRoute = getCurRoute()
    let app = apps.find(item => {
        return curRoute.startsWith(item.activeRule)
    })
    if (!app) {
        return
    }

    // 简单写法
    // 3、加载子应用
    // 请求加载子应用的entry，其实是为了把html请求过来
    // let html = await fetch(app.entry).then(res => res.text())
    // const container = document.querySelector(app.container)
    // 子应用渲染需要通过执行js渲染页面
    // innerHTML 不会加载html中的script，浏览器的安全考虑
    // 这时候需要我们自己手动加载执行
    // eval 或者 new function()
    // 4、渲染子应用
    // container.innerHTML = html

    // 使用库文件方法
    const container = document.querySelector(app.container)
    const {template, getExternalScripts, execScripts} = await importHTML(app.entry)
    window.__POWERED_BY_QIANKUN__ = true
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/'

    // 先把入口文件渲染
    container.prepend(template)

    const appExports = await execScripts()

    // 扩展当前app，比如子应用的生命周期
    app.bootstrap = appExports.bootstrap
    app.mount = appExports.mount
    app.unmount = appExports.unmount

    // 执行子应用bootstrap方法
    await bootstrap(app)

    // 执行子应用的mount方法
    await mount(app)

}

async function bootstrap(app) {
    app.bootstrap && (await app.bootstrap())
}

async function mount(app) {
    app.mount && (await app.mount({
        container: document.querySelector(app.container)
    }))
    // app.mount && (await app.mount())
}

async function unmount(app) {
    app.unmount && (await app.unmount({
        container: document.querySelector(app.container)
    }))
}