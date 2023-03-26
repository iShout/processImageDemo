/**
 * 当图片被上传后，预览和下载按钮才可点击。
 * 采用发布订阅模式
 */

class ObserverEvent {
  constructor() {
    this.dependsList = {};
  }
  //添加依赖
  addDepend(key, fn) {
    if (!this.dependsList[key]) {
      this.dependsList[key] = [];
    }
    this.dependsList[key].push(fn)
  }
 //通知依赖
  notice(key,value){
    if(!this.dependsList[key]){
      return
    }
    for(let i=0,len = this.dependsList[key].length;i<len;i++){
      this.dependsList[key][i].call(null,value)
    }
  }
}

export default ObserverEvent
