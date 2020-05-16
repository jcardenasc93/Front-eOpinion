import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AdminHomeComponent } from './app/admin-home/admin-home.component';
import {AdminPreguntaComponent} from "./app/admin-pregunta/admin-pregunta.component";
import {PreguntaMultipleComponent} from "./app/pregunta/pregunta-multiple/pregunta-multiple.component";

const routes: Routes = [
  { path: 'home', component: AdminHomeComponent },
  { path: 'evento', component: AdminPreguntaComponent },
  { path: 'preguntaMultiple', component: PreguntaMultipleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
