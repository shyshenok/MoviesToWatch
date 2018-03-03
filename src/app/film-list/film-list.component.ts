import {Component, Injectable, OnInit, ViewChild} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SharedTokenService} from "../services/shared-token.service";
import {WunderlistTask} from "../models/wunderlistTasks";
import {ActivatedRoute, Router} from "@angular/router";
import {TextareaComponent} from "../textarea/textarea.component";
import {Observable} from "rxjs/Rx";
import {MovieResponse} from "../models/movieResponse";
import {ImdbResultsForLocalStorage} from "../models/imdb-results-for-local-storage";
import {MovieObject} from "../models/movie";


@Injectable()

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})

export class FilmListComponent implements OnInit {

  movieResponseResult: ImdbResultsForLocalStorage[];
  ifClicked: boolean = false;
  listId: number;
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
  inputValue:string;
  showHint:boolean = false;
  showStatus:boolean = false;
  statusValue: number;
  @ViewChild(TextareaComponent) textareaComponent: TextareaComponent;

  constructor(private httpClient: HttpClient,
              private sharedServiceToken: SharedTokenService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {


    this.route.queryParams.subscribe(qParams => {
      this.listId = qParams['list_id'];
      this.listName = qParams['listName'];

      this.headerToken = this.sharedServiceToken.getServiceToken().access_token;


      let params = new HttpParams();
      params = params.append('list_id', qParams["list_id"]);

      this.httpClient.get<WunderlistTask[]>("https://a.wunderlist.com/api/v1/tasks",
        {
          headers: {
            'Accept-Language': 'ru-RU',
            'Content-Language': 'ru-RU',
            'X-Access-Token': this.headerToken,
            'X-Client-ID': this.clientId
          },
          params: params
        },)
        .subscribe(data => {
          this.filmList = data;

          this.displayFilmList = this.filmList;
        });

    });

  }


  selectFunction() {
    if (!this.ifClicked) {
      if (!this.movieResponseResult) {
        this.doSynchronize();
      }
      this.ifClicked = true;
    } else {
      this.ifClicked = false;
    }
  }

  doSynchronize() {
    let length = this.displayFilmList.length;
    let currentLength = length;
    this.showStatus = true;
    Observable.from(this.displayFilmList)

      .bufferCount(12)
      .concatMap(o => {
        currentLength -= 12;
        this.statusValue = +((1 - currentLength/length)*100).toFixed(0);

        return Observable.timer(5000).map(_ => o);
      })
      .flatMap(buffer => Observable.from(buffer))
      .do(o => console.log("Current: " + o.title))
      .do(o => {
        o.title = o.title.replace('— Википедия', '').replace('- Wikipedia', '').replace('(фильм)', '').trim()
      })
      .flatMap(o =>
        this.httpClient.get<MovieResponse>('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=' +
                                            o.title.replace(" ", '+') + "&language=ru&include_image_language=ru")
          .map(data => data.results)
          .flatMap(results => Observable.from(results)
            .flatMap(res => this.httpClient.get<MovieObject>("https://api.themoviedb.org/3/movie/"+res.id+"?api_key="+
                                                              this.apiKey+ '&query=&language=ru&include_image_language=ru'))
              .toArray()
          )
          .map(arrayOfResults => new ImdbResultsForLocalStorage(o.id, o.title, o.created_by_id, arrayOfResults)))
      .toArray()
      .finally(() => {
      this.showStatus = false;
    })
      .subscribe(arrayOfImdbResultsForLocalStorage => {

        localStorage.setItem('results', JSON.stringify(arrayOfImdbResultsForLocalStorage));

        this.movieResponseResult = arrayOfImdbResultsForLocalStorage;

      });

  }


  onTabChange(tab: number) {
    this.tabNumber = tab;
    if (this.tabNumber === 0) {
      this.displayFilmList = this.filmList;
      return;
    }

    this.displayFilmList = this.filmList.filter(film => {
      switch (this.tabNumber) {
        case 1:
          return film.created_by_id === 53342247;
        case  2:
          return film.created_by_id === 20359197;
        default:
          return true;
      }
    })
  }

  getInputValue(value) {
    this.inputValue = value;
  }

  addNewFilm() {

    let body = `{\"list_id\":${this.listId}, \"title\":\"${this.inputValue}\"}`;

    this.httpClient.post<WunderlistTask>('https://a.wunderlist.com/api/v1/tasks', body ,{
      headers: {'X-Access-Token': this.headerToken,
        'X-Client-ID': this.clientId,
        'Content-Type': 'application/json'
      }
    }).subscribe(data => {
      let foundResult = this.displayFilmList.findIndex(object => object.title.toLowerCase().trim() === data.title.toLowerCase().trim());
      console.log(foundResult);
      if (foundResult !== -1) {
        this.showHint = !this.showHint;
        if(this.textareaComponent) {
          this.textareaComponent.clearInput();
        }
      } else {
        this.queryForTMDBInfo(data)
      }
    });
  }

  queryForTMDBInfo(film: WunderlistTask) {
    this.filmList.push(film);
    if(this.textareaComponent) {
      this.textareaComponent.clearInput();
    }
    this.httpClient.get<MovieResponse>('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=' + film.title.replace(" ", '+')+"&language=ru-RU")
      .map(data => data.results)
      .flatMap(results => Observable.from(results)
        .flatMap(res => this.httpClient.get<MovieObject>("https://api.themoviedb.org/3/movie/"+res.id+"?api_key="+ this.apiKey+"&query&language=ru-RU"))
        .toArray())
      .map(results => new ImdbResultsForLocalStorage(film.id, film.title, film.created_by_id, results))
      .subscribe(data => {

        this.addToCache(data)

      })
  }


  addToCache(element) {
    let temp = JSON.parse(localStorage.getItem('results'));
    console.log(temp);
    temp.push(element);
    console.log(temp);
    localStorage.setItem('results', JSON.stringify(temp));
  }

  deleteFromCache(id) {
    let temp = JSON.parse(localStorage.getItem('results'));
    console.log(temp);
    let foundResult = temp.findIndex(object => object.wunderlistId === id);
    if (foundResult !== -1) {
      console.log('if');
      temp.splice(foundResult, 1);
      console.log(temp);
      localStorage.setItem('results', JSON.stringify(temp));
    }
  }

  moveToWatchedFilms(element) {
    console.log(element);
    let currentElRevision = this.displayFilmList[element].revision;
    let currentElId = this.displayFilmList[element].id;
    let completed = true;

    console.log(currentElRevision);
    let body = `{\"revision\":${currentElRevision}, \"completed\":${completed}}`;

    this.httpClient.patch<WunderlistTask>('https://a.wunderlist.com/api/v1/tasks/' + currentElId, body, {
      headers: {
        'X-Access-Token': this.headerToken,
        'X-Client-ID': this.clientId,
        'Content-Type': 'application/json'
      }
    }).subscribe(data => {
      console.log(data);
    });

    setTimeout(() => {
      this.removeMovieFromList(element);
    }, 700);
  }

  removeMovieFromList(indexFilm) {
    this.ifChange = true;
    this.deleteFromCache(this.displayFilmList[indexFilm].id);
    this.displayFilmList.splice(indexFilm, 1);
  }

  goToAuthorization() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  back() {
    this.router.navigate(['list']);
  }

  doRandomize(array: Array<WunderlistTask>) {
    let min = 0;
    let max = array.length - 1;
    this.num = Math.floor(Math.random() * (max - min + 1)) + min + 1;
    this.randChoise = array[this.num - 1].title;
  }

}
