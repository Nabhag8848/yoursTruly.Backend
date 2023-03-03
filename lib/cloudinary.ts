import { ImagesResponse } from "openai";
import * as dotenv from "dotenv";
dotenv.config();
import { logger } from "../services/logger";
import cloudinary from "cloudinary";
import { imageUrl } from "../types/images";
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

class CloudinaryStorage {
  private configuration: cloudinary.ConfigOptions;
  private cloudinary: typeof cloudinary;
  constructor(cloud_name: string, api_key: string, api_secret: string) {
    this.configuration = {
      cloud_name,
      api_key,
      api_secret,
    };
    this.cloudinary = cloudinary;
    this.cloudinary.v2.config(this.configuration);

    logger.info(
      "Cloudinary Storage intialised and configured with parameters."
    );
  }

  public async getApiInstance() {
    return this.cloudinary;
  }
  public async testStoreUrls() {
    const response = await this.cloudinary.v2.uploader.upload(
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"
    );
    return response;
  }
  public async storeGeneratedUrls(responseUrls: Array<imageUrl>) {
    let imageUrls: Array<imageUrl> = [];

    logger.debug("Storing Urls");

    for (let i = 0; i < responseUrls.length; ++i) {
      const cloudinaryStoreResponse = await this.cloudinary.v2.uploader.upload(
        responseUrls[i].url
      );

      imageUrls.push({ url: cloudinaryStoreResponse.secure_url });
    }

    logger.info("Secure Urls", imageUrls);
    return imageUrls;
  }
}

export const cloudinaryStorage = new CloudinaryStorage(
  cloud_name,
  api_key,
  api_secret
);

async function helper() {
  const response = await cloudinaryStorage.testStoreUrls();
  logger.debug("Cloudinary test Store Urls", {
    response,
  });
}
