import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BannerComponent} from './banner/banner.component';
import {MatCardModule} from "@angular/material/card";
import {AdminPreguntaComponent} from './admin-pregunta/admin-pregunta.component';
import {PreguntaMultipleComponent} from './pregunta/pregunta-multiple/pregunta-multiple.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { PreguntaAbiertaComponent } from './pregunta/pregunta-abierta/pregunta-abierta.component';
import { PreguntaSimpleComponent } from './pregunta/pregunta-simple/pregunta-simple.component';
import { PreguntaAbiertaNumeroComponent } from './pregunta/pregunta-abierta-numero/pregunta-abierta-numero.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    BannerComponent,
    AdminPreguntaComponent,
    PreguntaMultipleComponent,
    PreguntaAbiertaComponent,
    PreguntaSimpleComponent,
    PreguntaAbiertaNumeroComponent
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
    MatButtonModule
  ],
  entryComponents: [PreguntaMultipleComponent],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
