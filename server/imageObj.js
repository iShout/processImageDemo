/**
 * 服务器存储图片对象，通过闭包存储
 */
const ImageObj = (function(){
  let image = null
  return{
    getImage(){
      return image
    },
    storeImage(data){
      image = data
    }
  }
})()
module.exports = ImageObj