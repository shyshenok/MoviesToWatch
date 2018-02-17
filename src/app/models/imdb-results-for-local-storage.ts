import {MovieResponseResult} from "./movieResponse";



export interface ImdbResultsForLocalStorage {
  wunderlistId: number;
  wunderlistTitle: string;
  results: MovieResponseResult[];
}
