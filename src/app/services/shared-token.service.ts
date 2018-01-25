import { Injectable } from '@angular/core';
import {TokenObject} from "../models/token";

@Injectable()
export class SharedTokenService {
  public sharedServiceToken: TokenObject;

  constructor() { }

}
