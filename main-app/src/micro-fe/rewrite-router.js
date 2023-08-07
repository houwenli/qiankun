import { handleRouter } from './handle-router'

let preRoute = ''
let curRoute = window.location.pathname

export const getPreRoute = () => preRoute
export const getCurRoute = () => curRoute

export const rewriteRouter = function () {
    // hash路由，window.hashChange()
    // history路由
    //      history.go、history.back、history.forword 使用popstate事件，window.onpopstate
    //      pushState、replaceState需要对函数进行重写
    window.addEventListener('popstate', () => {
        // 这个地方要想清楚
        preRoute = curRoute
        curRoute = window.location.pathname
        handleRouter()
    })

    let oriPushState = window.history.pushState
    window.history.pushState = (...args) => {
        preRoute = window.location.pathname
        oriPushState.apply(window.history, args)
        curRoute = window.location.pathname
        handleRouter()
    }

    let oriReplaceState = window.history.replaceState
    window.history.replaceState = (...args) => {
        preRoute = window.location.pathname
        oriReplaceState.apply(window.history, args)
        curRoute = window.location.pathname
        handleRouter()
    }
}