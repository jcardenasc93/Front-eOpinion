import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpEvent} from "@angular/common/http";
import Swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminPreguntaComponent} from "../../pregunta/admin-pregunta/admin-pregunta.component";
import {EventoService} from "../../../services/evento.service";

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {
  public registerForm: FormGroup;
  nombre;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { idEvento },
              public dialogRef: MatDialogRef<AdminPreguntaComponent>,
              private eventoService: EventoService) {
  }

  ngOnInit(): void {
    this.getEvento();
  }

  getEvento(): void {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      bodyCorreo: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
    });

    this.eventoService.getEventoXId(this.data.idEvento).subscribe(data => {
      console.log('info de evento', data);
      this.registerForm.get('nombre').setValue(data.evento.nombre);
      this.registerForm.get('fecha').setValue(data.evento.fecha);
      this.registerForm.get('bodyCorreo').setValue(data.evento.bodyCorreo);
      this.registerForm.get('link').setValue(data.evento.linkEvento);

    }, error => {
      console.log('Error trayendo evento', error);
    });
  }

  editEvent() {
    this.eventoService.updateEvento(this.data.idEvento, this.registerForm).subscribe(data => {
      console.log("exitoso edit ", data)
      Swal.fire('Success!', 'Evento editado satisfactiriamente', 'success');
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      console.log('Error trayendo evento', error);
    });
  }

  autogrow() {
    const textArea = document.getElementById('txtInput');
    textArea.style.overflow = 'hidden';

    textArea.style.height = textArea.scrollHeight + 'px';
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
