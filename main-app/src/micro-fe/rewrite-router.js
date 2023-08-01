import { handleRouter } from './handle-router'

export const rewriteRouter = function () {
    // hash路由，window.hashChange()
    // history路由
    //      history.go、history.back、history.forword 使用popstate事件，window.onpopstate
    //      pushState、replaceState需要对函数进行重写
    window.addEventListener('popstate', () => {
        handleRouter()
    })

    let oriPushState = window.history.pushState
    window.history.pushState = (...args) => {
        oriPushState.apply(window.history, args)
        handleRouter()
    }

    let oriReplaceState = window.history.replaceState
    window.history.replaceState = (...args) => {
        oriReplaceState.apply(window.history, args)
        handleRouter()
    }
}