import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sync-film',
  templateUrl: './sync-film.component.html',
  styleUrls: ['./sync-film.component.scss']
})
export class SyncFilmComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goToAuthorization() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  back() {
    this.router.navigate(['list']);
  }

}
