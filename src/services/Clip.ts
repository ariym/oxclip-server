import {parseTranscript} from "./Transcript";


// 'Clip' refers to timeline segments of audio/video content
// 'Episode' is a clip with extra metadata
// 'Source' refers to an original upload of media


export default class Clip {
  
  id: string;

  constructor(id: string){
    this.id = id;
  }

  // todo: deprecate this function when transcript gets added to db
  public getTranscript() {
    // todo: parses transcript from txt file
    return parseTranscript(this.id);
  }
  
}