import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenObject} from "../models/token";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  clientId: string = "0cfaf22850320aa5eb2c";
  clientSecret: string = "5ae146130c3d583a21144dfc81b4f3459edaf6d8f031a2ed1cc676c030a3";
  redirectUri: string = "http://localhost:4200";
  url: string = "https://www.wunderlist.com/oauth/authorize?client_id=" + this.clientId + "&redirect_uri=" + this.redirectUri + "&state=RANDOM";
  tokenObject: TokenObject;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    console.log('OnInit');
    this.route.queryParams.subscribe(qParams => {
      let code = qParams['code'];
      console.log('code ' + code);

      if (code === null) {
        return;
      }

      const h = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

      this.http.post<TokenObject>("http://localhost:8080/", {
        "client_id": this.clientId,
        "client_secret": this.clientSecret,
        "code": code
      }, {headers:h}).subscribe(data => {
        console.log(data.access_token);
        this.tokenObject = data;
      });

    });
  }


  authorization() {
    console.log('hello');
    window.location.replace(this.url);
  //
  }


}
