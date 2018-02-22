import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AppRoutingModule } from './app-routing.module';
import { FilmListComponent } from './film-list/film-list.component';
import { WunderlistListComponent } from './wunderlist-list/wunderlist-list.component';
import {SharedTokenService} from "./services/shared-token.service";
import { TemplateButtonComponent } from './template-button/template-button.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { ButtonComponent } from './button/button.component';
import { SyncFilmComponent } from './sync-film/sync-film.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SortablejsModule} from "angular-sortablejs";



@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    FilmListComponent,
    WunderlistListComponent,
    TemplateButtonComponent,
    TextareaComponent,
    TabsComponent,
    TabComponent,
    ButtonComponent,
    SyncFilmComponent,
    ModalDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SortablejsModule.forRoot({ animation: 150 }),
  ],
  providers: [SharedTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
