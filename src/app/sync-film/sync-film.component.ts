import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
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
  modalWunderlistId: ImdbResultsForLocalStorage;
  @Output() deleteFilm = new EventEmitter();


  constructor() {}

  ngOnInit() {
  }

  showMoreResults(element) {
    this.modalResults = element.results;
    this.modalWunderlistId = element.wunderlistId;
    this.show = !this.show;
  }

  clickMinus(id) {

    console.log(id);
    this.deleteFilm.emit(id);
  }

  deleteFromDialog(id) {
    let foundResult = this.modalResults.findIndex(object => object.id === id);
    if (foundResult !== -1) {
      this.modalResults.splice(foundResult, 1);
    }
  }


}


