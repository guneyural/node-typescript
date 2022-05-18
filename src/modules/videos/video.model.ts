import mongoose from "mongoose";
import { UserDocument } from "../user/user.model";
import { customAlphabet } from "nanoid";

enum Extensions {
  mp4 = "mp4",
}

export interface VideoDocument extends mongoose.Document {
  title: string;
  description: string;
  extension: Extensions;
  owner: UserDocument["_id"];
  videoId: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const nanoid = customAlphabet("123456789abcdefghijklmnoprqrstuvwxyz");

const VideoSchema = new mongoose.Schema<VideoDocument>(
  {
    title: { type: String },
    description: { type: String },
    extension: { type: String, enum: ["mp4"] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    videoId: { type: String, default: () => nanoid() },
    published: { type: Boolean },
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", VideoSchema);

export default VideoModel;
