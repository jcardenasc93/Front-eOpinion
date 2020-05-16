import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pregunta-multiple',
  templateUrl: './pregunta-multiple.component.html',
  styleUrls: ['./pregunta-multiple.component.css']
})
export class PreguntaMultipleComponent implements OnInit {
  questionForm: FormGroup;
  displayType: number;
  esMultipleRespuesta = false;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<PreguntaMultipleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { idEvento }) {
    this.initializeForm();
  }

  ngOnInit(): void {
  }

    initializeForm() {
    this.questionForm = this.formBuilder.group({
      enunciado: ['', [Validators.required]],
      esMultipleResp: [false, [Validators.required]],
      esNominal: [false, [Validators.required]],
      nombre: ['', [Validators.required]],
      tieneRetroalimentacion: [false, [Validators.required]],
      numeroDeIntentos: [1, [Validators.required,  Validators.min(1)]],
      opciones: this.formBuilder.array([])
    });
  }

  agregarMarca(){


  }

  quitarOpcion(i) {
    const opciones = this.questionForm.get('opciones') as FormArray;
    opciones.removeAt(opciones.length - 1);
  }

  agregarOpcion() {
    const opciones = this.questionForm.controls.opciones as FormArray;
    opciones.push(this.formBuilder.group({
      opcion: ['', [Validators.required]],
      esCorrecta: false,
    }));
  }

}
