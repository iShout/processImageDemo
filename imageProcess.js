/**
 * @description 压缩图片
 * @param {string} imageData 原图的base64
 * @param {number} width 被压缩的图片的宽度（如果需要压缩到一半，则是原图width的一半）
 * @returns 压缩后图片的base64
 */
function compressBase64(imageData, width) {
  const chunks = splitIntoChunks(imageData, width); // 将 Base64 编码的字符串按照每行 width 个字符进行分组
  const chunksCount = chunks.length;
  const compressedData = new Array(chunksCount);

  for (let i = 0; i < chunksCount; i++) {
    const chunk = chunks[i];
    const pixel = reorderChunk(chunk); // 对每个分组进行重排列，得到一个像素值
    compressedData[i] = pixel;
  }

  return compressedData.join(""); // 将所有像素值拼接成一个字符串
}

/**
 * @description 解压缩图片
 * @param {string} 被压缩图片的base64
 * @param {number} width 还原的图片宽度
 * @returns 被还原图片的base64
 */
function decompressBase64(compressedData, width) {
  const pixelSize = width / 4; // 每个像素值占用 4 个字符
  const compressedDataLength = compressedData.length;
  const chunksCount = Math.ceil(compressedDataLength / pixelSize);
  const chunks = new Array(chunksCount);

  for (let i = 0; i < chunksCount; i++) {
    const pixelStartIndex = i * pixelSize;
    const pixel = compressedData.substr(pixelStartIndex, pixelSize); // 从压缩数据中截取每个像素值
    const chunk = reverseReorderPixel(pixel); // 对每个像素值进行逆向重排列，得到分组字符串
    chunks[i] = chunk;
  }

  return chunks.join(""); // 将所有分组字符串拼接成一个 Base64 编码的字符串
}

// 将 Base64 编码的字符串按照每行 width 个字符进行分组
function splitIntoChunks(imageData, width) {
  const chunks = [];
  const imageDataLength = imageData.length;
  let chunk = "";

  for (let i = 0; i < imageDataLength; i++) {
    const char = imageData.charAt(i);
    chunk += char;

    if (chunk.length === width) {
      chunks.push(chunk);
      chunk = "";
    }
  }

  if (chunk) {
    chunks.push(chunk);
  }

  return chunks;
}

// 对每个分组进行重排列，得到一个像素值
function reorderChunk(chunk) {
  let pixel = "";

  for (let i = 0; i < chunk.length; i += 4) {
    pixel += chunk.charAt(i);
    pixel += chunk.charAt(i + 1);
    pixel += chunk.charAt(i + 2);
    pixel += chunk.charAt(i + 3);
  }

  return pixel;
}

// 对每个像素值进行逆向重排列，得到分组字符串
function reverseReorderPixel(pixel) {
  let chunk = "";
  let result = "";

  for (let i = 0; i < pixel.length; i++) {
    if (i % 3 === 0) {
      chunk += pixel.charAt(i);
    }
    if (i % 3 === 1) {
      chunk += pixel.charAt(i - 1);
      chunk += pixel.charAt(i);
    }
    if (i % 3 === 2) {
      chunk += pixel.charAt(i - 2);
      chunk += pixel.charAt(i - 1);
      chunk += pixel.charAt(i);
      result += chunk;
      chunk = "";
    }
  }
  return result;
}

export { compressBase64, decompressBase64 };
