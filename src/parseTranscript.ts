import fs from 'fs';


// Interface for transcript array objects
export interface TranscriptLine {
  timestampBegin: string;
  timestampEnd: string;
  speech: string;
}


const getTxtFile = (pth: string) => fs.readFileSync(pth, 'utf8');


export default function parseTranscript(filePath: string): TranscriptLine[] {

  // 1. Split the transcript into lines
  const lines = getTxtFile(filePath).split('[');

  // 1a. Remove the first line, which is empty
  lines.shift();

  // 2. Convert each line into an object
  const transcript = lines.map((line) => {
    // 2a. split ts from speech
    const lineSplit = line.split(']  ');
    // 2b. split timestamp into begin and end
    const timestamp = lineSplit[0].split(' --> ');
    // 3c. remove \n from speech
    const speech = lineSplit[1].replace('\n', '');

    return {
      timestampBegin: timestamp[0],
      timestampEnd: timestamp[1],
      speech,
    }
  });

  return transcript;
}