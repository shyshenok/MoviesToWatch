import { Component,EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {ImdbResultsForLocalStorage} from "../models/imdb-results-for-local-storage";
import {MovieObject} from "../models/movie";


@Component({
  selector: 'app-sync-film',
  templateUrl: './sync-film.component.html',
  styleUrls: ['./sync-film.component.scss']
})
export class SyncFilmComponent implements OnInit, OnChanges{

  @Input() movieResponseResult: ImdbResultsForLocalStorage[];
  displayMovieResponseResult: ImdbResultsForLocalStorage[];
  tabNumber: number;
  minMaxForRating:boolean = false;
  minMaxForTime: boolean = false;
  show: boolean = false;
  modalResults: MovieObject[];
  modalWunderlistId: ImdbResultsForLocalStorage;
  @Output() deleteFilm = new EventEmitter();


  constructor() {

  }
  ngOnChanges() {
    this.displayMovieResponseResult = this.movieResponseResult;
  }

  ngOnInit(){

  }

  onTabChange(tab: number) {

    this.tabNumber = tab;
    if (this.tabNumber === 0) {
      this.displayMovieResponseResult = this.movieResponseResult;
      console.log(this.displayMovieResponseResult);

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

  showMoreResults(element) {
    this.modalResults = element.results;
    this.modalWunderlistId = element.wunderlistId;
    this.show = !this.show;
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


}


