import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {SharedTokenService} from "../services/shared-token.service";

@Injectable()

@Component({
  selector: 'app-wunderlist-list',
  templateUrl: './wunderlist-list.component.html',
  styleUrls: ['./wunderlist-list.component.css']
})
export class WunderlistListComponent implements OnInit {

  clientId: string = "0cfaf22850320aa5eb2c";
  headerToken: string;
  wunderList: Array<Wunderlist>;


  constructor(private httpClient: HttpClient,
              private sharedServiceToken: SharedTokenService) { }

  ngOnInit() {

    this.headerToken = this.sharedServiceToken.sharedServiceToken.access_token;

    this.httpClient.get("https://a.wunderlist.com/api/v1/lists", {headers: {'X-Access-Token': this.headerToken, 'X-Client-ID': this.clientId}})
      .subscribe(value => {
      console.log(value);
    });
  }

}
