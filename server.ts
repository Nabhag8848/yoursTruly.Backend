import express from "express";
import { code } from "./services/openai";
import bodyParser from "body-parser";
import { Request, Response, ErrorRequestHandler } from "express";
import cors from "cors";

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/code", code);
app.use(cors()); // configure cors

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    statusCode: 200,
    response: {
      data: "health check",
    },
  });
});

app.use(((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send({
    statusCode: 500,
    response: {
      error: err,
    },
  });
}) as ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}!`);
});
