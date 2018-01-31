import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-exit-button',
  templateUrl: './exit-button.component.html',
  styleUrls: ['./exit-button.component.scss']
})
export class ExitButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAuthorization() {
    localStorage.clear()
    this.router.navigate(['']);
  }

}
