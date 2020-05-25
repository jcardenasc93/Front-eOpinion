import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuariosService} from "../../../services/usuarios.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-asambleista',
  templateUrl: './edit-asambleista.component.html',
  styleUrls: ['./edit-asambleista.component.css']
})
export class EditAsambleistaComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public usuariosService: UsuariosService,
              @Inject(MAT_DIALOG_DATA) public data: { asambleistaObj }) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    console.log('asambleista', this.data.asambleistaObj)
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [this.data.asambleistaObj.email, [Validators.required, Validators.pattern(emailregex)]],
      'inmueble': [this.data.asambleistaObj.inmueble, Validators.required],
      'documento': [this.data.asambleistaObj.documento, Validators.required],
      'first_name': [this.data.asambleistaObj.first_name, Validators.required],
      'celular': [this.data.asambleistaObj.celular],
      'coeficiente': [this.data.asambleistaObj.coeficiente, Validators.required],
      'mora': [this.data.asambleistaObj.mora],
    });
  }
    delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateAsambleista() {
    this.usuariosService.updateSingleAsambleista(this.formGroup.value, this.data.asambleistaObj.id).subscribe(async data => {
      Swal.fire('Success!', 'asambleista creado satisfactiriamente', 'success');
      await this.delay(1000);
      window.location.reload();

    }, error => {
      Swal.fire('Error!', 'Revisa los campos, es posible que sea el formato del telefono ', 'error');
      console.log('persistir ', error.error);
    });

  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' : '';
  }


}
