import { Injectable } from '@angular/core';
import {MovieObject} from "../models/movie";

@Injectable()
export class SharedMovieObjectService {

  public imdbMovieObj:Array<MovieObject> = [];

  constructor() { }

}
