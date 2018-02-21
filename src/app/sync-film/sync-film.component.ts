import {Component, OnInit, Input} from '@angular/core';
import {ImdbResultsForLocalStorage} from "../models/imdb-results-for-local-storage";
import {MovieObject} from "../models/movie";

@Component({
  selector: 'app-sync-film',
  templateUrl: './sync-film.component.html',
  styleUrls: ['./sync-film.component.scss']
})
export class SyncFilmComponent implements OnInit{

  @Input() movieResponseResult: ImdbResultsForLocalStorage[];
  show: boolean = false;
  modalResults: MovieObject[];

  constructor() { }

  ngOnInit() {
  }

  showMoreResults(results) {
    this.modalResults = results;
console.log(this.modalResults);
    this.show = !this.show;
  }
}


