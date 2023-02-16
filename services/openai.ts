import express from "express";
import { openai } from "../lib/openaisdk";
import { Request, Response } from "express";
import { logger } from "./logger";

const router = express.Router();

router.post("/translation", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    logger.info("POST: /code/translation", { endpoint: "/code/translation", prompt });
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { router as code };
