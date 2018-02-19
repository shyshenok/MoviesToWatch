import {MovieObject} from "./movie";



export class ImdbResultsForLocalStorage {

  constructor(public wunderlistId:number,
              public wunderlistTitle: string,
              public results: MovieObject[]) {

  }
}
