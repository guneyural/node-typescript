import VideoModel, { VideoDocument } from "./video.model";

export function createVideo({ owner }: { owner: string }) {
  return VideoModel.create({ owner });
}

export function findVideo(videoId: VideoDocument["videoId"]) {
  return VideoModel.findOne({ videoId });
}

export function findVideos() {
  return VideoModel.find({ published: true }).lean();
}
