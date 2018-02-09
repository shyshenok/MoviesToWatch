import {Component, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedTokenService} from "../services/shared-token.service";
import {WunderlistTask} from "../models/wunderlistTasks";

@Injectable()

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  inputValue: string = '';
  top:boolean = false;
  @Input() listId:number;
  headerToken: string;
  clientId: string = "0cfaf22850320aa5eb2c";


  constructor(private http: HttpClient,
              private sharedServiceToken: SharedTokenService,
  ) { }

  ngOnInit() {
  }

  focusFunction(isFocused) {
    if(isFocused){
        this.top = true;
    } else {
      if (this.inputValue !== '') {
        this.top = true;
      } else {
        this.top = false;
      }
    }

  }

  addNewFilm() {
    console.log("string "+this.inputValue);
    console.log("id "+this.listId);


    this.headerToken = this.sharedServiceToken.getServiceToken().access_token;

    let body = `{\"list_id\":${this.listId}, \"title\":\"${this.inputValue}\"}`;

    this.http.post<WunderlistTask>('https://a.wunderlist.com/api/v1/tasks', body ,{
      headers: {'X-Access-Token': this.headerToken,
                   'X-Client-ID': this.clientId,
                    'Content-Type': 'application/json'
      }
      }).subscribe(data => {
        console.log(data);
    });
  }



}
