import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SharedTokenService} from "../services/shared-token.service";
import {WunderlistTask} from "../models/wunderlistTasks";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieObject} from "../models/movie";
import {TextareaComponent} from "../textarea/textarea.component";
import {Observable} from "rxjs/Rx";


@Injectable()

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})

export class FilmListComponent implements OnInit {

  movieObject:MovieObject;
  ifClicked:boolean = false;
  listId:number;
  listName: string;
  apiKey: string = 'd59e2b0b45e54e54737b34e64dd843b3';
  headerToken: string;
  clientId: string = "0cfaf22850320aa5eb2c";
  filmList: WunderlistTask[];
  displayFilmList: WunderlistTask[];
  num: number;
  randChoise: string;
  tabNumber: number;
  ifChange: boolean = false;
  @ViewChild(TextareaComponent) textareaComponent:TextareaComponent;

  constructor(private httpClient: HttpClient,
              private sharedServiceToken: SharedTokenService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {


    this.route.queryParams.subscribe(qParams => {
      this.listId = qParams['list_id'];
      this.listName = qParams['listName'];

      this.headerToken = this.sharedServiceToken.getServiceToken().access_token;


      let params = new HttpParams();
      params = params.append('list_id', qParams["list_id"]);

      this.httpClient.get<WunderlistTask[]>("https://a.wunderlist.com/api/v1/tasks",
        {headers: {'Accept-Language': 'ru-RU','Content-Language': 'ru-RU','X-Access-Token': this.headerToken, 'X-Client-ID': this.clientId},
        params: params},)
        .subscribe(data => {
          this.filmList = data;
          console.log(this.filmList);

          this.displayFilmList = this.filmList;
        });

    });

  }

  doRandomize(array:Array<WunderlistTask>) {
    let min = 0;
    let max = array.length-1;
    this.num = Math.floor(Math.random() * (max - min + 1)) + min+1;
    this.randChoise = array[this.num-1].title;
  }

  selectFunction() {

    if(!this.ifClicked) {
      if(!this.movieObject) {
        this.doSynchronize();
      }
      this.ifClicked = true;
    } else {
      this.ifClicked = false;
    }

  }

  doSynchronize() {

    Observable.from(this.displayFilmList)
      .map(o => o.title.replace(" ", '+'))
      .flatMap(title => this.httpClient.get<movieResponse>('https://api.themoviedb.org/3/search/movie?api_key='+this.apiKey+'&query='+title))
      .map(data => data.results)
      .toArray()
      .subscribe(arrayOfArrays => {
        console.log(arrayOfArrays);
      });

  }

  back() {
    this.router.navigate(['list']);
  }

  onTabChange(tab:number) {
    this.tabNumber = tab;
    if(this.tabNumber === 0) {
      this.displayFilmList = this.filmList;
      return;
    }

    this.displayFilmList = this.filmList.filter(film => {
      switch (this.tabNumber){
        case 1:
          return film.created_by_id === 53342247;
        case  2:
          return film.created_by_id === 20359197;
        default:
          return true;
      }
    })
  }

  addFilm(film:WunderlistTask) {
    this.filmList.push(film);
    this.textareaComponent.clearInput();
  }

  goToAuthorization() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  moveToWatchedFilms(element) {
    console.log(element);
    let currentElRevision = this.filmList[element].revision;
    let currentElId = this.filmList[element].id;
    let completed = true;

    console.log(currentElRevision);
    let body = `{\"revision\":${currentElRevision}, \"completed\":${completed}}`;

    this.httpClient.patch<WunderlistTask>('https://a.wunderlist.com/api/v1/tasks/'+ currentElId, body ,{
      headers: {'X-Access-Token': this.headerToken,
        'X-Client-ID': this.clientId,
        'Content-Type': 'application/json'
      }
    }).subscribe(data => {
      console.log(data);
    });

    setTimeout( () => {
      this.removeMovieFromList(element);
    }, 2000);
  }

  removeMovieFromList(indexFilm) {
    this.ifChange = true;
    this.filmList.splice(indexFilm, 1);
  }


}
