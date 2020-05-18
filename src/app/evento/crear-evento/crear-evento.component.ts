import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminHomeComponent} from "../../admin-home/admin-home.component";
import {MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {EventoService} from "../../services/evento.service";

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  public registerForm: FormGroup;
  progress = 0;

  constructor(public dialogRef: MatDialogRef<AdminHomeComponent>, private eventoService: EventoService) {
  }

  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      excel: new FormControl(''),
      correo: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
    });
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

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('file').setValue(file);
    }
  }

  autogrow() {
    const textArea = document.getElementById('txtInput');
    textArea.style.overflow = 'hidden';

    textArea.style.height = textArea.scrollHeight + 'px';
  }
  crearEvento() {
    if (this.registerForm.valid) {
      this.eventoService.crearEvento(this.registerForm).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('Video subido satisfactoriamente!', event.body);
            Swal.fire('Success!', 'Evento creado satisfactiriamente', 'success');
            this.dialogRef.close();
            window.location.reload();
        }
      }, error => {
        console.log('Error registrandose-> ', error);
        Swal.fire('Oops...', error, 'error');
        this.progress = 0;
      });
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }

}
