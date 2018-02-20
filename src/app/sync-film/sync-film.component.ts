import {Component, OnInit, Input} from '@angular/core';
import {ImdbResultsForLocalStorage} from "../models/imdb-results-for-local-storage";

@Component({
  selector: 'app-sync-film',
  templateUrl: './sync-film.component.html',
  styleUrls: ['./sync-film.component.scss']
})
export class SyncFilmComponent implements OnInit{

  @Input() movieResponseResult: ImdbResultsForLocalStorage[];


  constructor() { }

  ngOnInit() {
  }
}


