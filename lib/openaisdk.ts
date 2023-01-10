import { Configuration, ConfigurationParameters, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();
import { logger } from "../services/logger";

const apiKey = process.env.OPENAI_KEY as string;

class OpenAiSDK {
  private parameter: ConfigurationParameters;
  private configuration: Configuration;

  constructor(apiKey: string) {
    this.parameter = {
      apiKey,
    };

    this.configuration = new Configuration(this.parameter);

    logger.info("OpenAi SDK intialised and configured with parameter.");
  }

  public getApiInstance(): OpenAIApi {
    return new OpenAIApi(this.configuration);
  }
}

export const openai = new OpenAiSDK(apiKey).getApiInstance();
