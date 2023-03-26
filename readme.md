## 描述
这是一个其他公司的笔试题。
我觉得这个demo很不错，所以以后可以持续更新代码的重构过程
## 说明
* 因为使用Module时，`<script type="module">`  会出现跨域问题，所以只能在项目中安装live-server插件，在本机端口起一个服务器启动项目。启动命令`npm run dev`
* 后端采用express，启动命令`npm run server`
## 完成的功能
* 通过 `点击/拖拽` 上传图片
* 将图片进行像素级的灰阶处理，并展示在前端页面上
* 提供预览按钮，预览灰阶处理后的图片的base64字符串，并复制在剪切板中
* 提供下载按钮，下载被灰阶处理后的图片
* 异步方法都可以调用loader组件表示正在加载中
* 使用原生js封装ajax
* 将剪切板中的图片压缩成更小的图片，并通过post方法上传至后端服务器
* 后端服务器将图片保存在本地，并返回上传图片的hash
## 项目中实现的其它东西
* 通过发布订阅模式，实现`按钮的禁用/使用`，`通知图像更新`功能
* loader组件使用惰性单例模式，在触发时才创建此组件，并且只创建一个loader组件
* 使用闭包封装页面中展示图片的对象，尽量与其它逻辑解耦。
* 页面使用了BFC，使得可以页面组件可以自适应窗口大小
* 实现了message组件，可传入type以区分消息类别
## 文件说明
* 由于前端JS文件未做归类，看起来有点杂乱
> `basic.js` --html引用的主js文件，全局逻辑都在这里面

>`variables.js` -- 全局使用的变量和方法定义

>`drop.js` -- 页面拖拽方法的定义

>`singtleton.js` -- 单例模式定义

>`observer.js` -- 发布订阅模式定义

>`message.js` -- message组件定义

>`httpRequest.js` -- ajax封装

>`runOnServer.js` -- 使用`live-server`插件使得项目可以在本机端口上启动，为了解决module开发跨域问题。