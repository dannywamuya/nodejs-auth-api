require("dotenv").config();
import express from "express";
import config from "config";
import connectDB from "./utils/connectDb";
import logger from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5137",
  })
);

app.use(express.json());
app.use(deserializeUser);
app.use(router);

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`App is listening on http://localhost:${port}`);
  await connectDB();
});
