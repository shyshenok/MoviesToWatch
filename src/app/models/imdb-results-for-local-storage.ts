import {MovieResponseResult} from "./movieResponse";



export class ImdbResultsForLocalStorage {

  constructor(public wunderlistId:number,
              public wunderlistTitle: string,
              public results: MovieResponseResult[]) {

  }
}
