import { Component, OnInit } from '@angular/core';
// import {MovieObject} from "../movie.service";
// import  imdb from "imdb-api/lib/imdb";


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})

export class FilmListComponent implements OnInit {

  apiKey:string = "5942dc95";
  // movie: MovieObject;

  constructor() { }

  ngOnInit() {
    const imdb = require('imdb-api');
    imdb.get('The Toxic Avenger', {apiKey: this.apiKey}).then(console.log).catch(console.log);
  }

}
