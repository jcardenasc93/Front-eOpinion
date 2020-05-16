import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService} from '../services/usuarios.service';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private authService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl()
    });
  }

  login() {
    const user = this.registerForm.get('username').value;
    const pass = this.registerForm.get('password').value;
    console.log('ipass ', user);
    this.authService.loginUser(user, pass).subscribe(data => {
      console.log('ingreso exisoso ', data);
      sessionStorage.setItem('id_token', data.key);
      //this.getUserPk();
    }, error => {
      Swal.fire('Oops...', 'credenciales incorrectas');
      console.log('Error login-> ', error.error);
    });
  }
/*
  getUserPk() {
    this.authService.getUserId().subscribe(
      response => {
        sessionStorage.setItem('pkUser', response.body.pk);
        this.router.navigate(['/list-competition']);
      }, error => {
        console.log('error getUser', error);
      }
    );
  }*/

}
