import Clip from '../Clip';
import matchSearch from './matchSearch';
/*

Logic for playlists

1. assemble array of each instance of a keyord in:
  a. transcript (page: single episode)
  b. transcripts returned by episode search (page: search results)

2. select content by parameters: {type:"sentences" OR "Words", before: number, after: number}}

3. fetch content from before and after the keyword's sentences 'beginTime' and 'endTime' timestamps (using parameters defined above)


Playlist structure [array of clip objects with timestamp begin/end]

const playlists = [
  {
    name?: "clip: 1",
    beginTime: "00:00:00",
    endTime: "00:00:10",
    speech: "what was said"
  }
]

*/

interface PlaylistQueryTypes {
  query: string; // string to check for matches in transcript

  clipIds: string[]; // transcripts we are going to be searching

  additionalContentType: "sentences" | "words"; // how to count content before and after keyword
  before: number;
  after: number;
}



export default class Playlist {
  // declare class types
  id?: string;
  title?: string;

  constructor(id=null){
    this.id = id;
  }

  public async generateFromQuery(params: PlaylistQueryTypes) {
    const {clipIds, query} = params;

    // get array of transcripts
    const transcripts = clipIds.map(clipId => {
      const trans = new Clip(clipId).getTranscript();
      console.log("trans",trans);
      return trans;
    });


    let matches = [];

    // get array of matches
    transcripts.map(line => {
      const transMatches = matchSearch(line, query);
      if(transMatches.length > 0) matches.push(transMatches);
    });

    console.log("matches from every episode", matches);

    return matches;
  }

};