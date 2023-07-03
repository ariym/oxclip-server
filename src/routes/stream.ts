import {Request, Response} from 'express';
import path from 'path';
import fs from 'fs';

export default (req: Request, res: Response) => {
  console.log("requesting stream id", req.params.id);

  // from tutorial: https://youtu.be/ZjBLbXUuyWg
  
  const range = req.headers.range;
  if (!range) {
    res.status(400);
    throw new Error("Range header missing");
  }

  // get video stats
  const videoPath = path.resolve('./content/npr.mp3');
  const videoSize = fs.statSync(videoPath).size;

  // parse range
  // example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    // "Content-Type": "video/mp4",
    "Content-Type": "audio/mp3",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
};