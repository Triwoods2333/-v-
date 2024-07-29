import axios from "axios";
const OSS = require("ali-oss");
import fs from "fs";
import { Readable } from "stream";

// 初始化OSS客户端。请将以下参数替换为您自己的配置信息。
const oss = new OSS({
  region: "oss-cn-beijing", // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
  accessKeyId: process.env.OSS_ACCESS_KEY_ID, // 确保已设置环境变量OSS_ACCESS_KEY_ID。
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET, // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
  bucket: "wowpaper-demo", // 示例：'my-bucket-name'，填写存储空间名称。
});

export async function downloadAndUploadImage(
  imageUrl: string,
  ossKey: string,
  bucketName: string,
) {
  try {
    //把openai的图片下载下来，拿到文件流
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
    });
    //把下载的图片上传到图床
    const uploadParams = {
      Bucket: bucketName,
      Key: ossKey,
      Body: response.data as Readable,
    };
    return oss.upload(uploadParams).promise();
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}
export async function downloadImage(imageUrl: string, outputPath: string) {
  try {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      let error: Error | null = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        reject(err);
      });

      writer.on("close", () => {
        if (!error) {
          resolve(null);
        }
      });
    });
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}
