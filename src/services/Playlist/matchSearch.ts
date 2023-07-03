// basic string match search (no fuzz)
import { TranscriptLineType } from "../../types";

export default function stringMatch (transcript: TranscriptLineType[], query: string) {
  return transcript?.filter((line: any) => line.speech.toLowerCase().includes(query.toLocaleLowerCase()));
}