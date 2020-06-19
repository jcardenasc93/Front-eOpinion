import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsuariosService} from '../../services/usuarios.service';
import 'rxjs/add/operator/switchMap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {log} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private authService: UsuariosService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl()
    });
  }


  login() {
    const user = this.registerForm.get('username').value;
    const pass = this.registerForm.get('password').value;
    this.authService.loginUser(user, pass).subscribe(data => {
      sessionStorage.setItem('token', data.auth_token);
      console.log('respuesta login ', sessionStorage.getItem('token'));
      this.authService.getUserByToken(data.auth_token).subscribe(datas => {
        this.authService.validateAopderado().subscribe(datax => {
          Swal.fire('Oops...', 'Ya estas siendo representado por otro asambleista.', 'error');
          sessionStorage.setItem('token', 'null');
        }, error => {

          sessionStorage.setItem('is_staff', datas[0].is_staff);
          if (datas[0].is_staff == true) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/home-asambleitsa/' + datas[0].evento]);
          }

        });
      }, error => {
        console.log('Error login redir-> ', error);

      });
    }, error => {
      Swal.fire('Oops...', 'credenciales incorrectas');
      console.log('Error login-> ', error.error);
    });
  }


}
