/**
 * @description ajax封装
 * @param {string} url 发送的url
 * @param {string} method 请求的方法
 * @param {any} data 发送的数据
 * @returns {Promise} 后端返回的信息封装成的Promise
 */

const ajaxRequest = function (url, method, data) {
  return new Promise((resolve,reject) =>{
    const baseURl = "http://127.0.0.1:3000/";
    const xhr = new XMLHttpRequest();
    const targetUrl = `${baseURl}${url}`;
    const payload = JSON.stringify({ data: data });
  
    xhr.open(method, targetUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(payload);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.responseText)
        }
      }
    };
  })
};

export default ajaxRequest;
