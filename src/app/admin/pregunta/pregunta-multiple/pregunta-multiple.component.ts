import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PreguntaService} from "../../../services/pregunta.service";
import Swal from "sweetalert2";

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
              private preguntaService: PreguntaService,
              @Inject(MAT_DIALOG_DATA) public data: { idEvento }) {
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      enunciado: ['', [Validators.required]],
      esMultipleResp: [false, [Validators.required]],
      puntajeCoeficiente: [false, [Validators.required]],
      activa: [false],
      respuestasPermitidas: [1, [Validators.required, Validators.min(1)]],
      opciones: this.formBuilder.array([]),
      evento: [this.data.idEvento],
      timer: [null, [Validators.required]],
      opPresentacion: [null],
      strictMax:[false,[Validators.required]]
    });
  }

  crearPregunta() {
    this.questionForm.get('opPresentacion').setValue(this.displayType);
    this.preguntaService.createPreguntaMultiple(this.questionForm.value).subscribe(data => {
      Swal.fire('Success!', 'Pregunta multiple creada exitosamente', 'success');
      window.location.reload();
    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
      console.log('error', error);
    });
  }

  quitarOpcion(i) {
    const opciones = this.questionForm.get('opciones') as FormArray;
    opciones.removeAt(opciones.length - 1);
  }

  agregarOpcion() {
    const opciones = this.questionForm.controls.opciones as FormArray;
    opciones.push(this.formBuilder.group({
      opcion: ['', [Validators.required]]
    }));
  }

}
