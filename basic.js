/**
 * 全局脚本
 */
import {
  imageContainer,
  upload,
  previewBtn,
  downloadBtn,
  imageSelector,
  uploadImageObj,
  updateImage,
  copyToClipboard,
  putBase64InDiv,
  downloadPic,
  zipImage,
  compressImage,
} from "./variables.js";

import ObserverEvent from "./observer.js";

import { initDrop } from "./drop.js";
import showMessage from './message.js'
import ajaxRequest from "./httpRequest.js";

window.observerEvent = new ObserverEvent();
initDrop();

//选择文件按钮设定click回调
upload.addEventListener("click", () => {
  imageSelector.click();
  imageSelector.addEventListener("change", handleFile, false);
});
//预览文件按钮设定click回调
previewBtn.addEventListener("click", () => {
  const image = uploadImageObj.getImage();
  // const base64 = image.split(",")[1];
  const base64 = image;
  copyToClipboard.loading(base64).then(() => {
    showMessage("已复制base64到剪切板")
    putBase64InDiv(base64);
    observerEvent.notice("zipButtonDisabled", "copied");
  });
});
//下载文件按钮设定click回调
downloadBtn.addEventListener("click", () => {
  const image = uploadImageObj.getImage();
  downloadPic.href = image;
  downloadPic.download = "pic1";
  downloadPic.click();
});
// 压缩图片按钮设定click回调
zipImage.addEventListener("click", () => {
  navigator.clipboard.readText().then((value) => {
    compressImage(value).then((base64) => {
      ajaxRequest.loading('saveImage','post',base64).then(res => {
        showMessage(`后端返回的hash值为：${res}`)
        putBase64InDiv(`后端返回的hash值为：${res}`);
      }).catch(error => {
        showMessage('上传文件出错','error')
      })
    });
  });
});

/**
 * @description 选择图片之后进行的操作
 */
function handleFile(event) {
  const image = event.target.files[0];
  if (image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      updateImage(reader.result);
      observerEvent.notice("buttonDisabled", uploadImageObj.getImage());
    };
  }
}

/**
 * @description 设置预览按钮和下载按钮的状态
 * @param {boolean} isDisabled 预览按钮和下载按钮的禁用状态
 */
const setBtnStatus = (isDisabled) => {
  previewBtn.disabled = isDisabled;
  downloadBtn.disabled = isDisabled;
};

//订阅‘buttonDisabled’事件
observerEvent.addDepend("buttonDisabled", (value) => {
  if (!value) {
    setBtnStatus(true);
  } else {
    setBtnStatus(false);
  }
});

//订阅‘zipButtonDisabled’事件
observerEvent.addDepend("zipButtonDisabled", (value) => {
  if (value === "copied") {
    zipImage.disabled = false;
  } else {
    zipImage.disabled = true;
  }
});

//订阅‘updateImage事件’
observerEvent.addDepend("updateImage", (value) => {
  const node = imageContainer.children[0];
  node.src = value;
});

// 初始状态下，先发布一个通知来禁用按钮
observerEvent.notice("buttonDisabled", uploadImageObj.getImage());
observerEvent.notice("zipButtonDisabled", null);
