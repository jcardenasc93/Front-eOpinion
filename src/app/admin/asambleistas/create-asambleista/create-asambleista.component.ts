import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuariosService} from "../../../services/usuarios.service";
import Swal from "sweetalert2";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-asambleista',
  templateUrl: './create-asambleista.component.html',
  styleUrls: ['./create-asambleista.component.css']
})
export class CreateAsambleistaComponent implements OnInit {
    formGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, public usuariosService: UsuariosService,
              @Inject(MAT_DIALOG_DATA) public data: { idEvento }) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'inmueble': [null, Validators.required],
      'documento': [null, Validators.required],
      'nombre_completo': [null, Validators.required],
      'celular': [null],
      'coeficiente':  [null, Validators.required],
      'mora':  [false],
      'password': [null, [Validators.required, this.checkPassword]],
      'username': [null, [Validators.required]],
      'evento':[this.data.idEvento]
    });
  }
      delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  createAsambleista(){
    console.log('username', this.formGroup.get('username'))
    this.usuariosService.createSingleAsambleista(this.formGroup.value).subscribe(async data => {
      Swal.fire('Success!', 'asambleista creado satisfactiriamente', 'success');
      await this.delay(1000);
      window.location.reload();
    }, error => {
      Swal.fire('Error!', 'Error creando registro, revisa los campos ', 'error');
      console.log('persistir ', error.error);
    });

  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Campo requerido' :
      this.formGroup.get('email').hasError('pattern') ? 'No es un correo válido' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Campo requerido (Por lo menos 8 caracteres, una letra mayúscula y un número)' :
      this.formGroup.get('password').hasError('requirements') ? 'Por lo menos 8 caracteres, una letra mayúscula y un número' : '';
  }


  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }


}
