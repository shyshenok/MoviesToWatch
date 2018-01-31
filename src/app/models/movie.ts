

export interface MovieObject {

  data: Data;
  about: About;
}

interface About {
  version: string;
  serverTime: string;
}

interface Data {
  movies: Movie[];
}

interface Movie {
  title: string;
  originalTitle: string;
  year: string;
  releaseDate: string;
  directors: Director[];
  writers: Director[];
  runtime: string;
  urlPoster: string;
  countries: string[];
  languages: string[];
  genres: string[];
  plot: string;
  simplePlot: string;
  idIMDB: string;
  urlIMDB: string;
  rating: string;
  metascore: string;
  rated: string;
  votes: string;
  type: string;
}

interface Director {
  name: string;
  id: string;
}

  // title: string;
  // _year_data: string;
  // rated: string;
  // released: string;
  // runtime: string;
  // genres: string;
  // director: string;
  // writer: string;
  // actors: string;
  // plot: string;
  // languages: string;
  // country: string;
  // awards: string;
  // poster: string;
  // metascore: string;
  // rating: string;
  // votes: string;
  // imdbid: string;
  // type: string;
  // response: string;
  // series: boolean;
  // imdburl: string;


