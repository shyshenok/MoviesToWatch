import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {WunderlistListComponent} from "./wunderlist-list/wunderlist-list.component";
import {FilmListComponent} from "./film-list/film-list.component";
import {SyncFilmComponent} from "./sync-film/sync-film.component";


const appRoutes: Routes = [
  {path: '', component: AuthorizationComponent},
  {path: 'list', component: WunderlistListComponent},
  {path: 'list/:listName', component: FilmListComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
