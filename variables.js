import getSingle from "./singleton.js";
import showMessage from "./message.js";

// 一些通用变量的定义
const imageContainer = document.getElementById("image");
const upload = document.getElementById("upload");
const previewBtn = document.getElementById("preview");
const downloadBtn = document.getElementById("download");
const imageSelector = document.getElementById("select-image");
const loader = document.getElementById("loader");
const textContainer = document.getElementById("text-container");
const downloadPic = document.getElementById("download-pic");
const zipImage = document.getElementById("zip-image");
/**
 * @description 封装上传图片对象
 */
const uploadImageObj = (function () {
  let image = null;
  return {
    getImage() {
      return image;
    },
    setImage(imageData) {
      image = imageData;
    },
  };
})();

/**
 * @description 灰阶处理图片函数
 * @param {string} image 图片原件
 * @returns {string} 灰阶处理之后的图片
 */
function processingImage(image) {
  const img = new Image();
  img.src = image;
  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    //图像灰阶处理
    for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      var gray = 0.299 * r + 0.587 * g + 0.114 * b;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    ctx.putImageData(imageData, 0, 0);
    uploadImageObj.setImage(canvas.toDataURL());
  };
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

/**
 * @description 加载动画实例，采用惰性单例模式，在触发时才创建此实例。
 */
const createLoading = function () {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.style.display = "none";
  document.body.appendChild(loader);
  return loader;
};
const createLoaderSingle = getSingle(createLoading);

/**
 * 所有异步操作都显示一个加载动画
 */
Function.prototype.loading = async function (...args) {
  const loader = createLoaderSingle();
  loader.style.display = "block";
  const res = await this.apply(null, Array.from(args));
  loader.style.display = "none";
  return res
};

/**
 * @descriptiont 将新的图片节点替换上去
 * @param {string} imageData FileReader拿到的图片数据（base64）
 */
function updateImage(imageData) {
  const node = imageContainer.children[0];
  if (node.tagName === "P") {
    const img = new Image();
    processingImage.loading(imageData).then(() => {
      img.src = uploadImageObj.getImage();
      imageContainer.replaceChild(img, node);
      observerEvent.notice("buttonDisabled", uploadImageObj.getImage());
    });
  } else {
    processingImage.loading(imageData).then(() => {
      observerEvent.notice("updateImage", uploadImageObj.getImage());
      observerEvent.notice("buttonDisabled", uploadImageObj.getImage());
    });
  }
}
/**
 * @description 将字符串写入剪切板
 * @param {string} text 放入剪切板的字符串
 * @returns {promise} 写入剪切板之后的promise，可调用thenable接口
 */
const copyToClipboard = function (text) {
  return navigator.clipboard.writeText(text);
};

//惰性单例模式创建展示base64的p标签
const createBase64Container = function () {
  const base64Container = document.createElement("p");
  textContainer.appendChild(base64Container);
  return base64Container;
};
const createBase64ContainerSingle = getSingle(createBase64Container);

/**
 * @description 将base64字符串传入p标签
 * @param {string} base64
 */
const putBase64InDiv = function (base64) {
  const base64Container = createBase64ContainerSingle();
  base64Container.innerHTML = base64;
};

/**
 * @description 压缩图片
 * @param {string} base64 原图的base64编码
 */
const compressImage = function (base64, multiple = 0.6) {
  const length = base64.length / 1024;
  let newImage = new Image();
  let quality = 0.6; // 压缩系数0-1之间
  newImage.src = base64;
  let imgWidth, imgHeight;
  let w = undefined;
  newImage.onload = function () {
    // 这里面的 this 指向 newImage
    // 通过改变图片宽高来实现压缩
    w = this.width * multiple;
    imgWidth = this.width;
    imgHeight = this.height;
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        // 等比例缩小
        canvas.height = w * (imgHeight / imgWidth);
      } else {
        canvas.height = w;
        // 等比例缩小
        canvas.width = w * (imgWidth / imgHeight);
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      // quality 设置转换为base64编码后图片的质量，取值范围为0-1  没什么压缩效果
      // 还是得通过设置 canvas 的宽高来压缩
      quality = 0.6;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height); //  // 这里面的 this 指向 newImage
    let smallBase64 = canvas.toDataURL("image/png", quality); // 压缩语句
    uploadImageObj.setImage(smallBase64);
    console.log('图片已压缩');
    showMessage('图片已压缩');
    observerEvent.notice("updateImage", uploadImageObj.getImage());
  };
  return Promise.resolve(uploadImageObj.getImage())
};

export {
  imageContainer,
  upload,
  previewBtn,
  downloadBtn,
  imageSelector,
  loader,
  uploadImageObj,
  processingImage,
  updateImage,
  copyToClipboard,
  putBase64InDiv,
  downloadPic,
  zipImage,
  compressImage,
};
