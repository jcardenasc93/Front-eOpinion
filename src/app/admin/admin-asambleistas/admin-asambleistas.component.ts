import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {UsuariosService} from "../../services/usuarios.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  displayedColumns: string[] = ['inmueble', 'nombres', 'documento', 'email', 'celular', 'coeficiente', 'mora'];

  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute) {
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
    }, error => {
      console.log('Error login-> ', error.error);
    });
  }

  subirExcel(){

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
      this.registerForm.get('documento_excel').setValue(file);
    }
  }

   createForm() {
    this.registerForm = new FormGroup({
      documento_excel: new FormControl('')
    });
  }

  persistirAsambleistas(){
    this.usuariosService.persistirAsambleistas(this.idEvent).subscribe(data => {
      this.getAsambleistas();
      console.log('Persiste exitoso ', data);
    }, error => {
      console.log('persistir ', error.error);
    });
  }


}
