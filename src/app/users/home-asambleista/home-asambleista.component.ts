import {Component, OnInit} from '@angular/core';
import {PreguntaMultipleComponent} from "../../admin/pregunta/pregunta-multiple/pregunta-multiple.component";
import {MatDialog} from "@angular/material/dialog";
import {CargaPoderesComponent} from "../carga-poderes/carga-poderes.component";
import {UsuariosService} from "../../services/usuarios.service";

@Component({
  selector: 'app-home-asambleista',
  templateUrl: './home-asambleista.component.html',
  styleUrls: ['./home-asambleista.component.css']
})
export class HomeAsambleistaComponent implements OnInit {

  constructor(public dialog: MatDialog, public authService: UsuariosService) {
  }
  public usuario;

  ngOnInit(): void {
    this.getInfoAsambleista();
  }

  openPoderesModal(): void {
    this.dialog.open(CargaPoderesComponent, {
      width: '70%',
    });
  }

  getInfoAsambleista() {
    this.authService.getUserByToken(sessionStorage.getItem('token')).subscribe(datas => {
      this.usuario = datas[0];
      console.log('usuario data', this.usuario);
    }, error => {
      console.log('Error login redir-> ', error);

    });
  }


}
