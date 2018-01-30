import { Injectable } from '@angular/core';
import {TokenObject} from "../models/token";

@Injectable()
export class SharedTokenService {
  private sharedServiceToken: TokenObject = new TokenObject();

  constructor() { }

  getServiceToken() {
    if(this.sharedServiceToken.access_token === undefined) {
      this.sharedServiceToken.access_token = localStorage.getItem('access_token');
    }

    return this.sharedServiceToken;
  }

  saveServiceToken(token: string) {
    localStorage.setItem('access_token', token);
    this.sharedServiceToken.access_token = token;
  }

}
