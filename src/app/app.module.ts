import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BannerComponent} from './general/banner/banner.component';
import {MatCardModule} from "@angular/material/card";
import {AdminPreguntaComponent} from './admin/pregunta/admin-pregunta/admin-pregunta.component';
import {PreguntaMultipleComponent} from './admin/pregunta/pregunta-multiple/pregunta-multiple.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { PreguntaAbiertaComponent } from './admin/pregunta/pregunta-abierta/pregunta-abierta.component';
import { PreguntaSimpleComponent } from './admin/pregunta/pregunta-simple/pregunta-simple.component';
import { PreguntaAbiertaNumeroComponent } from './admin/pregunta/pregunta-abierta-numero/pregunta-abierta-numero.component';
import { LoginComponent } from './general/login/login.component';
import { RegistroComponent } from './admin/registro/registro.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './auth-guard.service';
import {JwPaginationComponent} from "jw-angular-pagination";
import {MatPaginatorModule} from "@angular/material/paginator";
import { CrearEventoComponent } from './admin/evento/crear-evento/crear-evento.component';
import { EditarEventoComponent } from './admin/evento/editar-evento/editar-evento.component';
import {MatDividerModule} from "@angular/material/divider";
import { AdminAsambleistasComponent } from './admin/asambleistas/admin-asambleistas/admin-asambleistas.component';
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import { EditPreguntaAbiertaComponent } from './admin/pregunta/edit-pregunta-abierta/edit-pregunta-abierta.component';
import { EditPreguntaAbiertaNumeroComponent } from './admin/pregunta/edit-pregunta-abierta-numero/edit-pregunta-abierta-numero.component';
import { EditPreguntaMultipleComponent } from './admin/pregunta/edit-pregunta-multiple/edit-pregunta-multiple.component';
import { HomeAsambleistaComponent } from './users/home-asambleista/home-asambleista.component';
import { CargaPoderesComponent } from './users/carga-poderes/carga-poderes.component';
import {MatListModule} from "@angular/material/list";
import { AdminPoderesComponent } from './admin/poderes/admin-poderes/admin-poderes.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { AnalizarPoderComponent } from './admin/poderes/analizar-poder/analizar-poder.component';
import { EditAsambleistaComponent } from './admin/asambleistas/edit-asambleista/edit-asambleista.component';
import { CreateAsambleistaComponent } from './admin/asambleistas/create-asambleista/create-asambleista.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    BannerComponent,
    AdminPreguntaComponent,
    PreguntaMultipleComponent,
    PreguntaAbiertaComponent,
    PreguntaSimpleComponent,
    PreguntaAbiertaNumeroComponent,
    LoginComponent,
    RegistroComponent,
    CrearEventoComponent,
    EditarEventoComponent,
    AdminAsambleistasComponent,
    EditPreguntaAbiertaComponent,
    EditPreguntaAbiertaNumeroComponent,
    EditPreguntaMultipleComponent,
    HomeAsambleistaComponent,
    CargaPoderesComponent,
    AdminPoderesComponent,
    AnalizarPoderComponent,
    EditAsambleistaComponent,
    CreateAsambleistaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDividerModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    MatSlideToggleModule
  ],
  entryComponents: [PreguntaMultipleComponent, CrearEventoComponent, EditarEventoComponent],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
