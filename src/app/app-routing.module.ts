import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorizationComponent} from "./authorization/authorization.component";


const appRoutes: Routes =[
  { path: '', component: AuthorizationComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
