import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminHomeComponent} from './app/admin/admin-home/admin-home.component';
import {AdminPreguntaComponent} from "./app/admin/admin-pregunta/admin-pregunta.component";
import {PreguntaMultipleComponent} from "./app/admin/pregunta/pregunta-multiple/pregunta-multiple.component";
import {LoginComponent} from "./app/general/login/login.component";
import {AuthGuardService} from './app/auth-guard.service';
import {AdminAsambleistasComponent} from "./app/admin/admin-asambleistas/admin-asambleistas.component";
import {HomeAsambleistaComponent} from "./app/users/home-asambleista/home-asambleista.component";

const routes: Routes = [
  {path: 'home', component: AdminHomeComponent, canActivate: [AuthGuardService]},
  {path: 'pregunta-admin/:idEvento', component: AdminPreguntaComponent, canActivate: [AuthGuardService]},
  {path: 'preguntaMultiple', component: PreguntaMultipleComponent},
  {path: 'asambleistas-admin/:idEvento', component: AdminAsambleistasComponent, canActivate: [AuthGuardService]},
  {path: 'home-asambleitsa/:idEvento', component: HomeAsambleistaComponent},
  {path: '', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
