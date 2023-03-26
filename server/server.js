const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const ImageObj = require('./imageObj.js')
const hashBase64 = require('./hashBase64.js')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'5mb'}))

// 设置允许跨域访问的响应头
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.post('/saveImage',(req,res)=>{
  const payload = req.body
  ImageObj.storeImage(payload.data)
  const hashData = hashBase64(ImageObj.getImage())
  res.send(hashData)
})

app.listen(3000,()=>{
  console.log("服务已启动，端口号3000");
})