import {Component, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SharedTokenService} from "../services/shared-token.service";
import {WunderlistTasks} from "../models/wunderlistTasks";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieObject} from "../models/movie";



@Injectable()

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})

export class FilmListComponent implements OnInit {

  // apiKey:string = '5942dc95';
  // apiToken:string = 'f45b71a5-e745-4965-8154-75f150b61744';

  listId:number;
  apiKey: string = 'd59e2b0b45e54e54737b34e64dd843b3';
  apiToken: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTllMmIwYjQ1ZTU0ZTU0NzM3YjM0ZTY0ZGQ4NDNiMyIsInN1YiI6IjVhNzIyYjU5YzNhMzY4NjA3NDAxMGMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pXlbc-LYSK5-OVqSkfoRNExGX279hDJpUKMfrVc7lnI'
  headerToken: string;
  clientId: string = "0cfaf22850320aa5eb2c";
  filmList: WunderlistTasks[];
  displayFilmList: WunderlistTasks[];
  num: number;
  randChoise: string;

  constructor(private httpClient: HttpClient,
              private sharedServiceToken: SharedTokenService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {


    this.route.queryParams.subscribe(qParams => {
      this.listId = qParams['list_id'];

      this.headerToken = this.sharedServiceToken.getServiceToken().access_token;


      let params = new HttpParams();
      params = params.append('list_id', qParams["list_id"]);

      this.httpClient.get<WunderlistTasks[]>("https://a.wunderlist.com/api/v1/tasks",
        {headers: {'Accept-Language': 'ru-RU','Content-Language': 'ru-RU','X-Access-Token': this.headerToken, 'X-Client-ID': this.clientId},
        params: params},)
        .subscribe(data => {
          this.filmList = data;
          console.log(this.filmList);

          this.displayFilmList = this.filmList;
        });

      // this.httpClient.post('https://api.themoviedb.org/4/auth/request_token',
      //   {headers:{"Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTllMmIwYjQ1ZTU0ZTU0NzM3YjM0ZTY0ZGQ4NDNiMyIsInN1YiI6IjVhNzIyYjU5YzNhMzY4NjA3NDAxMGMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pXlbc-LYSK5-OVqSkfoRNExGX279hDJpUKMfrVc7lnI',
      //             "Content-Type": "application/json;charset=utf-8"},
      //   // 'api_key': this.apiKey,
      //   // 'access_token': this.apiToken
      // }).subscribe(data =>{
      //   console.log(data);
      // })
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

    titleArray.forEach(title => {
      this.httpClient.get<MovieObject>('http://localhost:8080/apifilms/imdb/idIMDB?title='+title+'token='+this.apiToken+'&format=json&language=ru-RU&filter=2&imit=1')
        .subscribe(data => {
        console.log(data);
      });
    });
  }

  back() {
    this.router.navigate(['list']);
  }

  onTabChange(tab:number) {
    if(tab === 0) {
      this.displayFilmList = this.filmList;
      return;
    }

    this.displayFilmList = this.filmList.filter(film => {
      switch (tab){
        case 1:
          return film.created_by_id === 53342247;
        case  2:
          return film.created_by_id === 20359197;
        default:
          return true;
      }
    })
  }

  catchId() {

  }


}
