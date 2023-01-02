import { Configuration, ConfigurationParameters, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPENAI_KEY;

class OpenAiSDK {
  private parameter: ConfigurationParameters;
  private configuration: Configuration;

  constructor(apiKey) {
    this.parameter = {
      apiKey,
    };

    this.configuration = new Configuration(this.parameter);
  }

  public getApiInstance(): OpenAIApi {
    return new OpenAIApi(this.configuration);
  }
}

export const openai = new OpenAiSDK(apiKey).getApiInstance();
