import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import parseTranscript from './parseTranscript';

const app: Express = express();
app.use(cors());

const IP = "127.0.0.1";
const PORT = 3000;
app.listen(PORT, IP, () => {
  console.log('Server started at',IP,':',PORT);

  // const lines = parseTranscript('./transcript.txt');
  // console.log("lines", lines);
});

app.get('/', (req: Request, res: Response) => {
  // logging time of the request
  const now = new Date();
  const current = now.getHours() + ':' + now.getMinutes();
  console.log(current, "fetching transcript");

  const transcript = parseTranscript('./transcript.txt');

  res.send({
    message: 'Transcript successfully parsed!',
    transcript
  });

});