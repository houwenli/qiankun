import { rewriteRouter } from './rewrite-router'
import { handleRouter } from './handle-router'
let _apps = []

// 获取微应用列表
export const getApps = () => _apps

// 注册微应用
export const registerMicroApps = function (apps) {
    console.log(apps)
    _apps = apps
}

export const start = function () {
    // 微前端运行原理 
    // 1、监视路由变化
    rewriteRouter()

    // 这一步还要注意初始化的时候
    handleRouter()

    // 2、匹配子应用
    // 3、加载子应用
    // 4、渲染子应用
}
