import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {PreguntaService} from "../../services/pregunta.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-carga-poderes',
  templateUrl: './carga-poderes.component.html',
  styleUrls: ['./carga-poderes.component.css']
})
export class CargaPoderesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private preguntaService: PreguntaService,
              public dialogRef: MatDialogRef<CargaPoderesComponent>) { }

  ngOnInit(): void {
  }



}
