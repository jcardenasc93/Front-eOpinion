import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminHomeComponent} from './app/admin/admin-home/admin-home.component';
import {AdminPreguntaComponent} from "./app/admin/pregunta/admin-pregunta/admin-pregunta.component";
import {PreguntaMultipleComponent} from "./app/admin/pregunta/pregunta-multiple/pregunta-multiple.component";
import {LoginComponent} from "./app/general/login/login.component";
import {AuthGuardService} from './app/auth-guard.service';
import {AdminAsambleistasComponent} from "./app/admin/asambleistas/admin-asambleistas/admin-asambleistas.component";
import {HomeAsambleistaComponent} from "./app/users/home-asambleista/home-asambleista.component";
import {AdminPoderesComponent} from "./app/admin/poderes/admin-poderes/admin-poderes.component";

const routes: Routes = [
  {path: 'home', component: AdminHomeComponent, canActivate: [AuthGuardService]},
  {path: 'pregunta-admin/:idEvento', component: AdminPreguntaComponent, canActivate: [AuthGuardService]},
  {path: 'preguntaMultiple', component: PreguntaMultipleComponent},
  {path: 'asambleistas-admin/:idEvento', component: AdminAsambleistasComponent, canActivate: [AuthGuardService]},
  {path: 'poderes-admin/:idEvento', component: AdminPoderesComponent, canActivate: [AuthGuardService]},
  {path: 'home-asambleitsa/:idEvento', component: HomeAsambleistaComponent},
  {path: '', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
