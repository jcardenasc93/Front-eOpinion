import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../services/evento.service";
import Swal from "sweetalert2";
import {CrearEventoComponent} from "../evento/crear-evento/crear-evento.component";
import {MatDialog} from "@angular/material/dialog";
import {EditarEventoComponent} from "../evento/editar-evento/editar-evento.component";
import {Router} from "@angular/router";
import {CargaPoderesComponent} from "../../users/carga-poderes/carga-poderes.component";
import {CargaDocumentosComponent} from "../carga-documentos/carga-documentos.component";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  pageOfItems: Array<any>;
  public eventos;
  public currentItemsToShow;
  public eventosSize;


  constructor(private route: Router, private eventoService: EventoService, public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.getEventos();



  }

  subirDocumentos(idEvento): void {
    this.dialog.open(CargaDocumentosComponent, {
      width: '70%',
      data: {
        idEvento: idEvento,
      }
    });
  }

  onPageChange($event) {
    this.currentItemsToShow = this.eventos.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  getEventos(): void {
    this.eventoService.getEventos().subscribe(data => {
      console.log('eventos', data)
      this.eventos = data;
      this.eventos = this.eventos.reverse();
      this.eventosSize = data.length;
      this.currentItemsToShow = this.eventos.slice(0, 5);
    }, error => {
      console.log('Error login-> ', error.error);
    });



  }

  reload(){
    window.location.reload();
  }


  openCrearEvento(): void {
    const dialogRef = this.dialog.open(CrearEventoComponent, {
      width: '50%',
      height: '80%',
    });
  }

  borrarEvento(idEvento): void {
    if (confirm('Esta seguro de eliminar este evento?')) {
      this.eventoService.borrarEvento(idEvento).subscribe(data => {
        window.location.reload();
      }, error => {
        console.log('Error borrando', error);
      });
    }
  }

  editarEvento(idEvento): void {
    const dialogRef = this.dialog.open(EditarEventoComponent, {
      width: '50%',
      height: '80%',
       data: {
        idEvento: idEvento,
      }
    });
  }

   gotoPoderes(idEvento) {
    this.route.navigate(['poderes-admin/' + idEvento]);
  }

  gotoEvento(idEvento) {
    this.route.navigate(['pregunta-admin/' + idEvento]);
  }

  gotoAsambleistas(idEvento) {
    this.route.navigate(['asambleistas-admin/' + idEvento]);
  }
}
