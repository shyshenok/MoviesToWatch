import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {SharedTokenService} from "../services/shared-token.service";
import {WunderList} from "../models/wunderList";

@Injectable()

@Component({
  selector: 'app-wunderlist-list',
  templateUrl: './wunderlist-list.component.html',
  styleUrls: ['./wunderlist-list.component.scss']
})
export class WunderlistListComponent implements OnInit {

  clientId: string = "0cfaf22850320aa5eb2c";
  headerToken: string;
  wunderList: WunderList;

  constructor(private httpClient: HttpClient,
              private sharedServiceToken: SharedTokenService) { }

  ngOnInit() {

    this.headerToken = this.sharedServiceToken.getServiceToken().access_token;
    console.log(this.headerToken);


    this.httpClient.get<WunderList>("https://a.wunderlist.com/api/v1/lists", {headers: {'X-Access-Token': this.headerToken, 'X-Client-ID': this.clientId}})
      .subscribe(data => {
        this.wunderList = data;
        console.log(this.wunderList);

      });


  }


}
