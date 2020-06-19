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
  private evento: any;

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
      link_conferencia: new FormControl('', [Validators.required]),
      logo_asamblea: new FormControl('', [Validators.required]),
      codConferencia: new FormControl('', [Validators.required]),
    });

    this.eventoService.getEventoXId(this.data.idEvento).subscribe(data => {
      this.evento = data;
      console.log('info de evento', data);
      this.registerForm.get('nombre').setValue(data.evento.nombre);
      this.registerForm.get('fecha').setValue(data.evento.fecha);
      this.registerForm.get('bodyCorreo').setValue(data.evento.bodyCorreo);
      this.registerForm.get('link_conferencia').setValue(data.evento.link_conferencia);
      this.registerForm.get('logo_asamblea').setValue(data.evento.logo_asamblea);
      this.registerForm.get('codConferencia').setValue(data.evento.codConferencia);

    }, error => {
      console.log('Error trayendo evento', error);
    });
  }

  editEvent() {
    if ((this.registerForm.get('nombre').value == this.evento.evento.nombre) ||
      (this.registerForm.get('nombre').value == null)) {
      this.registerForm.get('nombre').setValue('cristianoRonaldo');
    }
    if ((this.registerForm.get('bodyCorreo').value == this.evento.evento.bodyCorreo) ||
      (this.registerForm.get('bodyCorreo').value == null)) {
      this.registerForm.get('bodyCorreo').setValue('cristianoRonaldo');
    }
    if ((this.registerForm.get('link_conferencia').value == this.evento.evento.link_conferencia) ||
      (this.registerForm.get('link_conferencia').value == null)) {
      this.registerForm.get('link_conferencia').setValue('cristianoRonaldo');
    }
    if ((this.registerForm.get('logo_asamblea').value == this.evento.evento.logo_asamblea) ||
      (this.registerForm.get('logo_asamblea').value == null)) {
      this.registerForm.get('logo_asamblea').setValue('cristianoRonaldo');
    }
    if ((this.registerForm.get('codConferencia').value == this.evento.evento.codConferencia) ||
      (this.registerForm.get('codConferencia').value == null)) {
      this.registerForm.get('codConferencia').setValue('cristianoRonaldo');
    }

    this.eventoService.updateEvento(this.data.idEvento, this.registerForm).subscribe(data => {
      console.log("exitoso edit ", data)
      Swal.fire('Success!', 'Evento editado satisfactiriamente', 'success');
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      Swal.fire('error!', 'Evento editado satisfactiriamente', 'error');
      console.log('Error trayendo evento', error);
      window.location.reload();
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      this.registerForm.get('logo_asamblea').setValue(file);
    }
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
