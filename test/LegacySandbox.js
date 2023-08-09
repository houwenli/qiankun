class LegacySandBox {
    currentUpdatedPropsValueMap = new Map()
    modifiedPropsOriginalValueMapInSandbox = new Map();
    addedPropsMapInSandbox = new Map();
    proxyWindow = {}
    constructor() {
        const fakeWindow = Object.create(null)
        this.proxyWindow = new Proxy(fakeWindow, {
            set: (target, prop, value, receiver) => {
                const originalVal = window[prop]
                if (!window.hasOwnProperty(prop)) {
                    this.addedPropsMapInSandbox.set(prop, value)
                } else if (!this.modifiedPropsOriginalValueMapInSandbox.hasOwnProperty(prop)) {
                    this.modifiedPropsOriginalValueMapInSandbox.set(prop, originalVal)
                }
                this.currentUpdatedPropsValueMap.set(prop, value)
                window[prop] = value
            },
            get: (target, prop, receiver) => {
                return window[prop]
            }
        })
    }
    setWindowProp(prop, value, isToDelete = false) {
        //有可能是新增的属性，后面不需要了
        if (value === undefined && isToDelete) {
            delete window[prop]
        } else {
            window[prop] = value
        }
    }
    active() {
        // 恢复上一次微应用处于运行状态时，对window上做的所有修改
        this.currentUpdatedPropsValueMap.forEach((value, prop) => {
            this.setWindowProp(prop, value)
        })
    }
    inactive() {
        // 还原window上原有的属性
        this.modifiedPropsOriginalValueMapInSandbox.forEach((value, prop) => {
            this.setWindowProp(prop, value)
        })
        // 删除在微应用运行期间，window上新增的属性
        this.addedPropsMapInSandbox.forEach((_, prop) => {
            this.setWindowProp(prop, undefined, true)
        })
    }
}
window.city = 'Beijing'
let legacySandBox = new LegacySandBox();
console.log('激活之前', window.city)
legacySandBox.active();
legacySandBox.proxyWindow.city = 'Shanghai';
console.log('激活之后', window.city)
legacySandBox.inactive();
console.log('失活之后', window.city)