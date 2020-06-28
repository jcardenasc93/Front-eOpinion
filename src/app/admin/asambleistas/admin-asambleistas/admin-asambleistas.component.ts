import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../../services/evento.service";
import {UsuariosService} from "../../../services/usuarios.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditarEventoComponent} from "../../evento/editar-evento/editar-evento.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateAsambleistaComponent} from "../create-asambleista/create-asambleista.component";
import {EditAsambleistaComponent} from "../edit-asambleista/edit-asambleista.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-asambleistas',
  templateUrl: './admin-asambleistas.component.html',
  styleUrls: ['./admin-asambleistas.component.css']
})
export class AdminAsambleistasComponent implements OnInit {
  private idEvent;
  private asambleistas;
  public dataSource;
  public registerForm: FormGroup;
  displayedColumns: string[] = ['inmueble', 'nombres', 'documento', 'email', 'celular', 'coeficiente', 'mora', 'actions'];
  public totalAsambleistas=0;

  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('idEvento');
    this.getAsambleistas();
    this.createForm();
  }

  getAsambleistas(): void {
    this.usuariosService.getAsableistasXEvento(this.idEvent).subscribe(data => {
      console.log('asambleista', data.asambleistas);
      this.dataSource = data.asambleistas;
      this.totalAsambleistas = this.dataSource.length;
    }, error => {
      console.log('Error login-> ', error.error);
    });
  }

  subirExcel() {

    this.usuariosService.crearAsambleistas(this.registerForm, this.idEvent).subscribe(data => {
      console.log('excisotoso subida ', data);
      this.persistirAsambleistas();

    }, error => {
      console.log('Error excel ', error);
    });

  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('asambleista file', event.target.files[0])
      this.registerForm.get('documento_excel').setValue(file);
    }
  }

  createForm() {
    this.registerForm = new FormGroup({
      documento_excel: new FormControl('')
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  persistirAsambleistas() {
    let mensaje = '';
    this.usuariosService.persistirAsambleistas(this.idEvent).subscribe(data => {
      console.log(data);
      try {
        data.usuarios_no_creados.forEach(dataItem => {
          console.log(dataItem);
          mensaje = mensaje + ' \n ' + dataItem;
        });
        Swal.fire('Success!', 'Los siguientes usuarios no fueron creados: ' + mensaje, 'success');
      } catch (err) {
        Swal.fire('Success!', 'Todos los usuarios fueron creados: ', 'success');
      }
      this.getAsambleistas();
    }, error => {
      console.log(error);
      if (error.status != 400 || error.status != 401) {
        this.delay(1500);
        Swal.fire('success!', 'cargue de archivos exitosa!', 'success');
      }else{
        Swal.fire('error!', 'Error cargando el archivo, ningun usuario fue creado', 'error');
      }
    });
  }


  editAsambleista(asambleista: any) {
    const dialogRef = this.dialog.open(EditAsambleistaComponent, {
      data: {
        asambleistaObj: asambleista,
      }
    });

  }

  deleteAsambleista(id: any) {
    if (confirm('Esta seguro de eliminar este asambleista?')) {
      this.usuariosService.deleteAsambleista(id).subscribe(data => {
        Swal.fire('Success!', 'Evento editado satisfactoriamente', 'success');
        this.getAsambleistas();
      }, error => {
        Swal.fire('error!', 'Oops algo pasó, intenta de nuevo', 'error');
      });
    }
  }

  createAsambleista(): void {
    const dialogRef = this.dialog.open(CreateAsambleistaComponent, {
      data: {
        idEvento: this.idEvent,
      }
    });
  }

  sendEmail(idPersona: any) {
    this.usuariosService.sendInviteEmail(idPersona).subscribe(data => {
      Swal.fire('Success!', 'Correo reenviado satisfactoriamente', 'success');
    }, error => {
      Swal.fire('error!', 'Oops algo pasó, intenta de nuevo', 'error');
    });

  }
}
