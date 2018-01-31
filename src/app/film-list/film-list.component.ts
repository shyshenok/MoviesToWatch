import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SharedTokenService} from "../services/shared-token.service";
import {WunderlistTasks} from "../models/wunderlistTasks";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieObject} from "../models/movie";


@Injectable()

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})

export class FilmListComponent implements OnInit {

  // apiKey:string = '5942dc95';
  apiToken:string = 'f45b71a5-e745-4965-8154-75f150b61744';
  headerToken: string;
  clientId: string = "0cfaf22850320aa5eb2c";
  filmList: WunderlistTasks;
  num: number;
  randChoise: string;

  constructor(private httpClient: HttpClient,
              private sharedServiceToken: SharedTokenService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(qParams => {

      this.headerToken = this.sharedServiceToken.getServiceToken().access_token;


      let params = new HttpParams();
      params = params.append('list_id', qParams["list_id"]);

      this.httpClient.get<WunderlistTasks>("https://a.wunderlist.com/api/v1/tasks",
        {headers: {'Accept-Language': 'ru-RU','Content-Language': 'ru-RU','X-Access-Token': this.headerToken, 'X-Client-ID': this.clientId},
        params: params},)
        .subscribe(data => {
          this.filmList = data;
        })
    });

  }

  doRandomize(array:Array<WunderlistTasks>) {
    let min = 0;
    let max = array.length-1;
    this.num = Math.floor(Math.random() * (max - min + 1)) + min+1;
    this.randChoise = array[this.num-1].title;
    console.log(array);
    console.log( this.num, this.randChoise);

  }

  doSynchronize(array:Array<WunderlistTasks>) {
    let titleArray = array.map(o => o.title);
    // const imdb = require('imdb-api');

    this.httpClient.get<MovieObject>('https://api.myapifilms.com/getTokenInfo/?token=' + this.apiToken).subscribe(data => {
      console.log(data);
    })

    // titleArray.forEach(o => imdb.get(o, {apiKey: this.apiKey}).then(console.log).catch(console.log));
  }

  back() {
    this.router.navigate(['list']);
  }

}
