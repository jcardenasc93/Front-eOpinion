import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreguntaService} from "../../../services/pregunta.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-pregunta-abierta',
  templateUrl: './pregunta-abierta.component.html',
  styleUrls: ['./pregunta-abierta.component.css']
})
export class PreguntaAbiertaComponent implements OnInit {
  questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private preguntaService: PreguntaService,
              public dialogRef: MatDialogRef<PreguntaAbiertaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { idEvento }) {

    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      enunciado: ['', [Validators.required]],
      timer: [null, [Validators.required]],
      activa: [false, [Validators.required]],
      evento: [this.data.idEvento, [Validators.required]],
    });
  }

  crearPregunta() {
    this.preguntaService.createPreguntaAbierta(this.questionForm.value).subscribe(data => {
      Swal.fire('Success!', 'Pregunta creada satisfactiriamente', 'success');
      this.dialogRef.close();
      window.location.reload();

    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}


