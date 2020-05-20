import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PreguntaService} from "../../../services/pregunta.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-pregunta-abierta-numero',
  templateUrl: './pregunta-abierta-numero.component.html',
  styleUrls: ['./pregunta-abierta-numero.component.css']
})
export class PreguntaAbiertaNumeroComponent implements OnInit {
  questionForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private preguntaService: PreguntaService,
              public dialogRef: MatDialogRef<PreguntaAbiertaNumeroComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { idEvento }) {
     this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      enunciado: ['', [Validators.required]],
      evento: [this.data.idEvento],
      activa: [false],
    });
  }

  crearPreguntaNumero() {
    console.log('1', this.questionForm.value.enunciado);
    console.log('2', this.questionForm.value.idEvento);
    console.log('3', this.questionForm.value.activa);

    this.preguntaService.createPreguntaDecimal(this.questionForm.value).subscribe(data => {

      Swal.fire('Success!', 'Pregunta creada satisfactiriamente', 'success');
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      console.log('sdsd',error);
      Swal.fire('Error!', 'Error creando pregunta', 'error');
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
