import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreguntaService} from "../../../services/pregunta.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-pregunta-multiple',
  templateUrl: './edit-pregunta-multiple.component.html',
  styleUrls: ['./edit-pregunta-multiple.component.css']
})
export class EditPreguntaMultipleComponent implements OnInit {
  public questionForm;
  displayType: number;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditPreguntaMultipleComponent>,
              private preguntaService: PreguntaService,
              @Inject(MAT_DIALOG_DATA) public data: { pregunta }) {
    this.initializeForm();
  }

  ngOnInit(): void {
    console.log('preghunta', this.data.pregunta);
  }

  initializeForm() {
    console.log('coeficiente',this.data.pregunta.puntajeCoeficiente)
    this.questionForm = this.formBuilder.group({
      enunciado: [this.data.pregunta.enunciado, [Validators.required]],
      esMultipleResp: [this.data.pregunta.esMultipleResp, [Validators.required]],
      puntajeCoeficiente: [this.data.pregunta.puntajeCoeficiente, [Validators.required]],
      activa: [this.data.pregunta.activa],
      respuestasPermitidas: [this.data.pregunta.respuestasPermitidas, [Validators.required, Validators.min(1)]],
      opciones: this.formBuilder.array([]),
      evento: [this.data.pregunta.evento],
      timer: [this.data.pregunta.timer],
      opPresentacion: [this.data.pregunta.opPresentacion],
    });
    const opciones = this.questionForm.controls.opciones as FormArray;

    this.data.pregunta.opciones.forEach(element =>
      opciones.push(this.formBuilder.group({
        opcion: [element.opcion, [Validators.required]]
      }))
    );

  }


  editarPregunta() {
     this.questionForm.get('opPresentacion').setValue(this.displayType);
    this.preguntaService.deletePreguntaMultiple(this.data.pregunta.id).subscribe(data => {

      this.preguntaService.createPreguntaMultiple(this.questionForm.value).subscribe(data => {
        Swal.fire('Success!', 'Pregunta multiple actualizada exitosamente', 'success');
        window.location.reload();
      }, error => {
        Swal.fire('Error!', 'Error actualizando pregunta', 'error');
        console.log('error', error);
      });

    }, error => {
      Swal.fire('Error!', 'Error actualizando pregunta X', 'error');
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

  cancelar() {
    this.dialogRef.close();
  }
}
