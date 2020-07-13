import {Component, OnInit} from '@angular/core';
import {UsuariosService} from "../../../services/usuarios.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {EditarEventoComponent} from "../../evento/editar-evento/editar-evento.component";
import {AnalizarPoderComponent} from "../analizar-poder/analizar-poder.component";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {EventoService} from "../../../services/evento.service";

class Poder {
  id: any;
  representado_por: any;
  representa_a: any;
  sumado: any;
  documento_poder: any;
  valido: any;
  evento: any;
  nomRepresentante: any;
  name: any;
  nomPropietario: any;
  inRep: any;
  inPro: any;
  externo: any;
}

export interface User {
  name: string;
}


@Component({
  selector: 'app-admin-poderes',
  templateUrl: './admin-poderes.component.html',
  styleUrls: ['./admin-poderes.component.css']
})
export class AdminPoderesComponent implements OnInit {
  myControl = new FormControl();
  options: Array<Poder> = [];
  filteredOptions: Observable<User[]>;


  public currentItemsToShow ;
  public eventosSize;
  private poderes: Array<Poder> = [];
  private idEvent: string;
  users: Array<Poder> = [];
  eventonombre;

  constructor(public eventoService:EventoService, public userService: UsuariosService, public route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('idEvento');
    this.getNomasamblea();
    this.getAllPowers();
    this.getpeople();

  }

  getNomasamblea(){
    this.eventoService.getEventoXId(this.idEvent).subscribe(data => {
      this.eventonombre =data.evento.nombre;
    }, error => {
      console.log('Error login-> ', error.error);
    });
  }

  getAllPowers() {
    this.userService.getPoderesXEvento(this.idEvent).subscribe(data => {

      data.apoderados.forEach(dataItem => {
        const poder = new Poder();
        poder.id = dataItem.id;
        poder.valido = dataItem.valido;
        poder.documento_poder = dataItem.documento_poder;
        poder.sumado = dataItem.sumado;
        poder.representa_a = dataItem.representa_a;
        poder.representado_por = dataItem.representado_por;
        poder.evento = dataItem.evento;
        poder.externo = dataItem.externo;
        this.poderes.push(poder);
      });

      this.eventosSize = data.length;
      console.log('poderes', data.apoderados);

      this.userService.getAsableistasXEvento(this.idEvent).subscribe(datas => {
        let j;
        let k;
        let asableistas = datas.asambleistas
        console.log('personas por evento ', asableistas)
        for (j = 0; j < asableistas.length; j++) {
          for (k = 0; k < this.poderes.length; k++) {
            console.log('representante', asableistas[j].id + ' ' + this.poderes[k].representado_por);
            if (asableistas[j].id == this.poderes[k].representado_por) {
              this.poderes[k].nomRepresentante = asableistas[j].nombre_completo;
              this.poderes[k].inRep = asableistas[j].inmueble;
            }
            if (asableistas[j].id == this.poderes[k].representa_a) {
              this.poderes[k].nomPropietario = asableistas[j].nombre_completo;
              this.poderes[k].inPro = asableistas[j].inmueble;
            }
          }
        }
        this.currentItemsToShow = this.poderes;
      }, error => {
        console.log('Error login-> ', error.error);
      });
    }, error => {
      console.log('Error login-> ', error.error);
    });
  }

  getpeople() {
    this.userService.getAsableistasXEvento(this.idEvent).subscribe(datas => {
      this.myControl = new FormControl();
      datas.asambleistas.forEach(dataItem => {
        const poder = new Poder();
        poder.id = dataItem.id;
        poder.name = dataItem.nombre_completo;
        this.options.push(poder);
      });

    }, error => {
      console.log('Error login-> ', error.error);
    });
  }

  onPageChange($event) {
    this.currentItemsToShow = this.poderes.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  gotoAnalize(idPoder, idAsambleista): void {
    const dialogRef = this.dialog.open(AnalizarPoderComponent, {
      width: '50%',
      data: {
        idPoder: idPoder,
        idEvento: this.idEvent,
        idAsambleista: idAsambleista
      }
    });
  }

  desasociar(representadopor, idPoder) {
    this.userService.adesasociarPoder(idPoder, this.idEvent).subscribe(datas => {
      this.userService.calculoCoeficientes(representadopor).subscribe(datax => {
        this.userService.setPoderNull(idPoder, this.idEvent).subscribe(dataz => {
          Swal.fire('Success!', 'Poder desasociado exitosamente', 'success');
          window.location.reload();
        }, error => {
          console.log("error poninendo null", error.error)
          Swal.fire('error!', error.error.detail, 'error');
        });
      }, error => {
        console.log("error coeficientte", error.error)
        Swal.fire('error!', error.error.detail, 'error');
      });
    }, error => {
      console.log('Error borrado-> ', error.error);
    });

  }


  rechazar(representadopor, idPoder) {
    if (confirm('Esta seguro de eliminar este poder?')) {
      this.userService.adesasociarPoder(idPoder, this.idEvent).subscribe(datas => {
        this.userService.calculoCoeficientes(representadopor).subscribe(datax => {
          this.userService.borrarPoder(idPoder).subscribe(datasz => {
            Swal.fire('Success!', 'Poder borrado exitosamente', 'success');
            window.location.reload();
          }, error => {
            console.log('Error borrado-> ', error.error);
          });
        }, error => {
          console.log("error poninendo null", error.error)
          Swal.fire('error!', error.error.detail, 'error');
        });
      }, error => {
        console.log("error poninendo null", error.error)
        Swal.fire('error!', error.error.detail, 'error');
      });
    }
  }
}
