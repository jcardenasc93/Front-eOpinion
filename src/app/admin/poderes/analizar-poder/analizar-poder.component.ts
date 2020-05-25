import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import Swal from "sweetalert2";
import {UsuariosService} from "../../../services/usuarios.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AdminPoderesComponent} from "../admin-poderes/admin-poderes.component";

class Poder {
  name: any;
  id: any;
  evento: any;
  inmueble: any;
}

@Component({
  selector: 'app-analizar-poder',
  templateUrl: './analizar-poder.component.html',
  styleUrls: ['./analizar-poder.component.css']
})

export class AnalizarPoderComponent implements OnInit {
  filteredOptions: Observable<Poder[]>;
  myControl = new FormControl();
  options: Array<Poder> = [];
  kpiValue: any;
  huehuBOYS: any;

  constructor(private formBuilder: FormBuilder, public userService: UsuariosService,
              @Inject(MAT_DIALOG_DATA) public data: { idPoder, idEvento, idAsambleista }) {
  }

  ngOnInit(): void {
    this.getpersonas();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  getpersonas() {
    this.userService.getAsableistasXEvento(this.data.idEvento).subscribe(datas => {
      console.log('personas de mierda', datas);
      datas.asambleistas.forEach(dataItem => {
        if (dataItem.id != this.data.idAsambleista) {
          const poder = new Poder();
          poder.id = dataItem.id;
          poder.name = dataItem.first_name;
          poder.evento = dataItem.evento;
          poder.inmueble = dataItem.inmueble;
          this.options.push(poder);
        }
      });
    }, error => {
      console.log('Error login-> ', error);
    });
  }

  savePoder() {
    this.userService.aprobarPoder(this.huehuBOYS.id, this.huehuBOYS.evento, this.data.idPoder).subscribe(data => {
      this.userService.calculoCoeficientes(this.data.idAsambleista).subscribe(datas => {
        Swal.fire('Success!', 'Poder aceptado exitosamente', 'success');
      }, error => {
        console.log('error calculocoeficiente', error);
        Swal.fire('error!', error.error.detail, 'error');
      });
    }, error => {
      Swal.fire('error!', error.error.detail, 'error');
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  savePoder1() {
    this.userService.getPoderesXEvento(this.data.idEvento).subscribe(dataf => {
      let pass = true;
      dataf.apoderados.forEach(dataItem => {
        if (dataItem.representa_a == this.huehuBOYS.id) {
          pass = false;
          Swal.fire('error!', 'Un propietario ya esta representando a ese inmueble', 'error');
        }
      });
      if (pass == true) {
        this.userService.adesasociarPoder(this.data.idPoder, this.data.idEvento).subscribe(datas => {
          this.userService.calculoCoeficientes(this.data.idAsambleista).subscribe(datax => {
            this.userService.setPoderNull(this.data.idPoder, this.data.idEvento).subscribe(dataz => {
              this.savePoder();
              this.delay(1500);
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
    }, error => {
      console.log('Error borrado-> ', error.error);
    });

  }


  displayFn(user: Poder): string {
    return user && user.inmueble ? user.inmueble : '';
  }

  private _filter(inmueble: string): Poder[] {
    const filterValue = inmueble.toLowerCase();

    return this.options.filter(option => option.inmueble.toLowerCase().indexOf(filterValue) === 0);
  }


}
