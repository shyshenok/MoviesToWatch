import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SharedTokenService} from "../services/shared-token.service";
import {WunderlistTasks} from "../models/wunderlistTasks";
import {ActivatedRoute, Router} from "@angular/router";


@Injectable()

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})

export class FilmListComponent implements OnInit {

  apiKey:string;
  headerToken: string;
  clientId: string = "0cfaf22850320aa5eb2c";

  filmList: WunderlistTasks;


  constructor(private httpClient: HttpClient,
              private sharedServiceToken: SharedTokenService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  //
  //   // const imdb = require('imdb-api');
  //   // imdb.get('The Toxic Avenger', {apiKey: this.apiKey}).then(console.log).catch(console.log);
  //   //
  //
    this.route.queryParams.subscribe(qParams => {

      this.headerToken = this.sharedServiceToken.sharedServiceToken.access_token;

      let params = new HttpParams();
      params = params.append('list_id', qParams["list_id"]);

      this.httpClient.get<WunderlistTasks>("https://a.wunderlist.com/api/v1/tasks", {headers: {'X-Access-Token': this.headerToken, 'X-Client-ID': this.clientId}, params: params},)
        .subscribe(data => {
          this.filmList = data;
        })
    });

  }

  doRamdomize(array:Array<WunderlistTasks>) {
    console.log(array);
  }

  back() {
    this.router.navigate(['list']);
  }

}
