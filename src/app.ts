import express from "express";
import logger from "./utils/logger";
import { connectDb, disconnectDb } from "./utils/database";
import helmet from "helmet";
import cors from "cors";
import { CORS_ORIGIN } from "./constants";
import UserRoutes from "./modules/user/user.route";
import AuthRoutes from "./modules/auth/auth.route";
import VideoRoutes from "./modules/videos/video.route";
import deserializeUser from "./middleware/deserializeUser";

const app = express();
const PORT = 2000;

app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/videos", VideoRoutes);

const server = app.listen(PORT, async () => {
  await connectDb();
  logger.info(`App is running at http://localhost:${PORT}`);
});

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();
    await disconnectDb();
    process.exit(0);
  });
}

const signals: string[] = ["SIGTERM", "SIGINT"];
signals.forEach((signal) => gracefulShutdown(signal));
