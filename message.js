const createMessage = function () {
  const message = document.createElement("div");
  message.id = "message-container";
  document.body.appendChild(message);
  return message;
};
function showMessage(message, type = "success", timeout = 3000) {
  // 创建 message 元素
  const messageElem = document.createElement("div");
  messageElem.classList.add("message", type);
  messageElem.textContent = message;

  // 创建 message 容器
  const messageContainer = createMessage();
  messageContainer.appendChild(messageElem);

  // 显示 message 容器
  messageContainer.classList.add("show");

  // 设置定时器自动隐藏 message
  setTimeout(() => {
    hideMessage(messageContainer);
  }, timeout);
}

function hideMessage(container) {
  // 隐藏 message 元素
  if (container) {
    container.classList.add("hide");
    setTimeout(() => {
      container.remove();
    }, 200);
  }
}

export default showMessage;
