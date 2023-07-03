// episode is just a clip obj with extra semantics related to podcasts/serialized content
export interface EpisodeObj {
  id: string;
  title: string;
  description: string;
  published: string;
  duration: number;
  transcript: string;
  tags: string[];
  showId: string;
  showObj?: ShowObj;
}


// TODO: Show should EXTEND "Playlist"
// show is a playlist obj with extra semantics related to serialized content
export interface ShowObj {
  id: string;
  title: string;
  description: string;
  episodes: EpisodeObj[];
  tags: string[];
  image: string;
  url: string;
  rssUrl: string;
}

// Interface for transcript array objects
export interface TranscriptLineType {
  timestampBegin: string;
  timestampEnd: string;
  speech: string;
}