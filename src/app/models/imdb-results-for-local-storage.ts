import {MovieObject} from "./movie";



export class ImdbResultsForLocalStorage {

  constructor(public wunderlistId:number,
              public wunderlistTitle: string,
              public created_by_id: number,
              public results: MovieObject[]) {

  }
}
