import {Component, EventEmitter, Injectable, Input, OnChanges, OnInit, Output} from "@angular/core";
import {ImdbResultsForLocalStorage} from "../models/imdb-results-for-local-storage";
import {Genre, MovieObject} from "../models/movie";
import { SearchByTitlePipe } from './search.pipe';


@Component({
  selector: 'app-sync-film',
  templateUrl: './sync-film.component.html',
  styleUrls: ['./sync-film.component.scss'],
})

@Injectable()
export class SyncFilmComponent implements OnInit, OnChanges{

  @Input() movieResponseResult: ImdbResultsForLocalStorage[];
  displayMovieResponseResult: ImdbResultsForLocalStorage[];
  tabNumber: number;
  minMaxForRating:boolean = false;
  minMaxForTime: boolean = false;
  showMoreRes: boolean = false;
  showAboutContent: boolean = false;
  modalResults: MovieObject[];
  modalWunderlistId: ImdbResultsForLocalStorage;
  imageLink: string;
  filterValue: string;
  aboutTheFilm: MovieObject;
  genresFilm: Genre[] = [];
  @Output() deleteFilm = new EventEmitter();


  constructor() {

  }
  ngOnChanges() {
    this.displayMovieResponseResult = this.movieResponseResult;
    console.log(this.displayMovieResponseResult);
  }

  ngOnInit(){

  }

  onTabChange(tab: number) {

    this.tabNumber = tab;
    if (this.tabNumber === 0) {
      this.displayMovieResponseResult = this.movieResponseResult;
      return;
    }

    this.displayMovieResponseResult = this.movieResponseResult.filter(film => {
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

  showAbout(element) {
    this.aboutTheFilm = element.results[0];
    this.genresFilm = this.aboutTheFilm.genres;
    this.showAboutContent = !this.showAboutContent;
    this.imageLink = 'https://image.tmdb.org/t/p/w500/' + this.aboutTheFilm.poster_path;
  }

  showMoreResults(element) {
    this.modalResults = element.results;
    this.modalWunderlistId = element.wunderlistId;
    this.showMoreRes = !this.showMoreRes;
  }

  sortingByRuntime() {
    this.minMaxForTime = !this.minMaxForTime;
    this._sortingByRuntime(this.minMaxForTime);
  }

  _sortingByRuntime(asc:boolean) {
    this.movieResponseResult.sort((a,b) => {
      let aRuntime = 0;
      let bRuntime = 0;
      if(a.results.length > 0) {
        aRuntime = a.results[0].runtime;
      }
      if(b.results.length > 0) {
        bRuntime = b.results[0].runtime;
      }
      if(asc) {
        return aRuntime - bRuntime;
      } else {
        return bRuntime - aRuntime;
      }
    });
  }


  sortingByRating() {
    this.minMaxForRating = !this.minMaxForRating;
    this._sortingByRating(this.minMaxForRating);
  }

  _sortingByRating(asc: boolean) {
    this.movieResponseResult.sort((a,b) => {
      let aRating = 0;
      let bRating = 0;
      if(a.results.length > 0) {
        aRating = a.results[0].vote_average;
      }
      if(b.results.length > 0) {
        bRating = b.results[0].vote_average;
      }
      if(asc) {
        return bRating - aRating;

      } else {
        return aRating - bRating;

      }
    });
  }

  clickMinus(id) {
    this.deleteFilm.emit(id);
  }

  deleteFromDialog(id) {
    let foundResult = this.modalResults.findIndex(object => object.id === id);
    if (foundResult !== -1) {
      this.modalResults.splice(foundResult, 1);
    }
  }

  getInputValue(value) {
    this.filterValue = value;
  }


}


