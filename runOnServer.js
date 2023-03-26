const liveServer = require("live-server");

const params = {
    port: 8080, // 设置服务器端口号
    root: "./", // 设置根目录
    file: "index.html", // 设置默认打开的HTML文件
    wait: 1000 // 设置重载延迟时间
};

liveServer.start(params);