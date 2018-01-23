import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorizationComponent} from "./authorization/authorization.component";
import {WunderlistListComponent} from "./wunderlist-list/wunderlist-list.component";


const appRoutes: Routes =[
  {path: '', pathMatch: 'full', redirectTo: 'authorization'},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'list', component: WunderlistListComponent},

  ];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
