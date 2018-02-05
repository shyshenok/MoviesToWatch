import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { FilmListComponent } from './film-list/film-list.component';
import { WunderlistListComponent } from './wunderlist-list/wunderlist-list.component';
import {SharedTokenService} from "./services/shared-token.service";
import { ExitButtonComponent } from './exit-button/exit-button.component';
import { TextareaComponent } from './textarea/textarea.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    FilmListComponent,
    WunderlistListComponent,
    ExitButtonComponent,
    TextareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [SharedTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
