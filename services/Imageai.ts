import express from "express";
import { openai } from "../lib/openaisdk";
import { Request, Response } from "express";
import { logger } from "./logger";
import { cloudinaryStorage } from "../lib/cloudinary";
import { imageUrl } from "../types/images";

const router = express.Router();

router.post("/image", async (req: Request, res: Response) => {
  try {
    const { prompt, n, size } = req.body;
    logger.info("POST: /generate/image", {
      endpoint: "/generate/image",
      prompt,
      n,
      size,
    });
    const response = await openai.createImage({
      prompt,
      n,
      size,
    });

    if (!response.status.toString().startsWith("2")) {
      logger.error(response);
      throw new Error("Error while Fetching Images");
    }

    const imageUrls = await cloudinaryStorage.storeGeneratedUrls(
      response.data.data as Array<imageUrl>
    );

    res.status(200).send(imageUrls);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
});

export { router as image };
