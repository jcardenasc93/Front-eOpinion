import {Component, Inject, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreguntaService} from "../../../services/pregunta.service";

@Component({
  selector: 'app-edit-pregunta-abierta-numero',
  templateUrl: './edit-pregunta-abierta-numero.component.html',
  styleUrls: ['./edit-pregunta-abierta-numero.component.css']
})
export class EditPreguntaAbiertaNumeroComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { idPregunta, enunciado },
              public dialogRef: MatDialogRef<EditPreguntaAbiertaNumeroComponent>,
              private preguntaService: PreguntaService) {
  }

  ngOnInit(): void {
    this.getEvento();
  }

  editPregunta() {
    this.preguntaService.editPreguntaAbiertaNumero(this.registerForm.value, this.data.idPregunta).subscribe(data => {
      Swal.fire('Success!', 'Pregunta editada satisfactiriamente', 'success');
    }, error => {
      console.log('Error trayendo evento', error);
    });

  }

  getEvento(): void {
    this.registerForm = new FormGroup({
      enunciado: new FormControl('', [Validators.required]),
    });
    this.registerForm.get('enunciado').setValue(this.data.enunciado);
  }


  cancel() {
    this.dialogRef.close();
  }
}
