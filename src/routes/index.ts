import express, { Request, Response } from 'express';

import stream from './stream';

import {
  parseTranscript,
  Playlist 
} from '../services';


const app = express();
export default app;


// episode json data
app.get('/episodes/:id', (req: Request, res: Response) => {
  if(!req.params.id) {
    res.status(400);
    throw new Error("Episode ID missing");
  }
  res.send({
    id: req.params.id,
    transcript: parseTranscript(req.params.id),
    title: "The high cost of a strong dollar",
    datePretty: "October 21, 2022",
    showName: "Planet Money"
  });
});


// episode mp3 or mp4 file stream
app.get("/stream/:id", stream);


// generate a playlist
// app.post("/playlist-query", async (req: Request, res: Response) => {
//   const { episodeId, query, playlistId=null } = req.body;
//   const pl = new Playlist(playlistId);
//   const updatedPlaylist = await pl.generateFromQuery(query, episodeId);
//   res.json({ updatedPlaylist });
// });