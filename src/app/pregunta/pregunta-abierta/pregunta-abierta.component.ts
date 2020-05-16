import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-pregunta-abierta',
  templateUrl: './pregunta-abierta.component.html',
  styleUrls: ['./pregunta-abierta.component.css']
})
export class PreguntaAbiertaComponent implements OnInit {
  questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<PreguntaAbiertaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { idEvento }) {

    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      enunciado: ['', [Validators.required]],
      esNominal: [false, [Validators.required]],
    });
  }

  crearPregunta() {

  }

  cancel() {

  }
}


