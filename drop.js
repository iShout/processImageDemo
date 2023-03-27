import { imageContainer, uploadImageObj, updateImage } from "./variables.js";

//拖拽图片功能，只支持.png, .jpeg, .jpg
const initDrop = function () {
  imageContainer.addEventListener("dragenter", function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  imageContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  imageContainer.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const image = e.dataTransfer.files[0];
    if (
      image.type.startsWith("image/") &&
      (image.name.toLowerCase().endsWith(".png") ||
        image.name.toLowerCase().endsWith(".jpg") ||
        image.name.toLowerCase().endsWith(".jpeg"))
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        // 初始化
        uploadImageObj.setImage(null);
        observerEvent.notice("buttonDisabled", uploadImageObj.getImage());
        observerEvent.notice("zipButtonDisabled", null);
        observerEvent.notice("decompressBtnDisabled", null);
        
        updateImage(reader.result);
        observerEvent.notice("buttonDisabled", uploadImageObj.getImage());
      };
    } else {
      alert("请拖拽格式为.jpg/.jepg/.png格式的文件图片");
    }
  });
};

export { initDrop };
