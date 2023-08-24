class SnapshotSandBox {
  windowSnapshot = {}
  modifyPropsMap = {}
  active() {
    // 保存window对象上所有属性的状态
    for(const prop in window) {
      this.windowSnapshot[prop] = window[prop]
    }
    // 恢复上一次在运行该微应用的时候所修改过的window上的属性
    Object.keys(this.modifyPropsMap).forEach(prop => {
      window[prop] = this.modifyPropsMap[prop]
    })
  }
  inactive() {
    for(const prop in window) {
      if(window[prop] !== this.windowSnapshot[prop]){
        // 记录修改了window上的哪些属性
        this.modifyPropsMap[prop] = window[prop]
        // 将window上的属性状态还原至微应用运行之前的状态
        window[prop] = this.windowSnapshot[prop]
      }
    }
  }
}
window.city = 'Beijing'
console.log('激活之前', window.city)
let snapshotSandBox = new SnapshotSandBox()
snapshotSandBox.active()
window.city = 'Shanghai'
console.log('激活之后',window.city)
snapshotSandBox.inactive()
console.log('失活之后',window.city)