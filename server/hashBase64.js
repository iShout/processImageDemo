const crypto = require("crypto");

/**
 * @description 将图片base64格式转换成hash
 * @param {string} base64 图片的base64 
 * @returns 通过base64生成的hash值
 */
const hashBase64 = function (base64) {
  const binaryData = Buffer.from(base64, "base64");

  const hash = crypto.createHash("sha256");

  hash.update(binaryData);

  const hashValue = hash.digest("hex");

  return hashValue
};

module.exports = hashBase64
