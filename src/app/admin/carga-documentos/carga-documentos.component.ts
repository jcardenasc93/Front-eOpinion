import {Component, EventEmitter, HostBinding, HostListener, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsuariosService} from "../../services/usuarios.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import Swal from "sweetalert2";
import {EventoService} from "../../services/evento.service";
import {HomeAsambleistaComponent} from "../../users/home-asambleista/home-asambleista.component";
import {AdminHomeComponent} from "../admin-home/admin-home.component";

@Component({
  selector: 'app-carga-documentos',
  templateUrl: './carga-documentos.component.html',
  styleUrls: ['./carga-documentos.component.css']
})
export class CargaDocumentosComponent implements OnInit {
  questionForm: FormGroup;
  file;
  files: any = [];
  progress = 0;
  dataSource;
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private formBuilder: FormBuilder,
              private userService: UsuariosService,
              private eventoService: EventoService,
              public dialogRef: MatDialogRef<AdminHomeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { idEvento }) {
  }

  ngOnInit(): void {
    this.getFiles();
    this.iniciarForm();
    this.getPoderesXusuario();
  }

  getFiles() {
    this.eventoService.getFiles(this.data.idEvento).subscribe((event: HttpEvent<any>) => {


    }, error => {
      console.log('Error registrandose-> ', error);
      Swal.fire('Oops...', 'Parece que hubo un problema con el archivo, revisa su extension e intenta de nuevo', 'error');
      this.progress = 0;
    });
  }

  iniciarForm() {
    this.questionForm = this.formBuilder.group({
      opciones: this.formBuilder.array([]),
    });
  }


  getPoderesXusuario() {
    this.eventoService.getFiles(this.data.idEvento).subscribe(dataz => {

      let data = dataz.documentos;

      let x;
      let i = 0;
      var a = "";
      for (i = 0; i < data.length; i++) {
        try {
          data[i].documento = data[i].documento.substring(data[i].documento.lastIndexOf('/') + 1);
        } catch (err) {
          data[i].documento = "Null";
        }
        console.log('nombre archivo', data[i].documento);
      }
      this.dataSource = data.reverse();
      console.log('lista de powers ', data);
    }, error => {
      console.log('Error trayendo poders-> ', error);
    });

  }


  getPoderes(evento) {
    if (this.files.length > 0) {
      this.files[0] = evento.target.files[0];
    } else {
      this.files.push(evento.target.files[0]);
    }

  }

  uploadFile() {
    console.log('files lengt', this.files.length);
    this.eventoService.saveFiles(this.data.idEvento, this.files[0]).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('Video subido satisfactoriamente!', event.body);

          Swal.fire('Success!', 'Archivo subido satisfactiriamente', 'success');
          this.progress = 0;
          this.files.splice(0, 1)
          this.getPoderesXusuario();
      }
    }, error => {
      console.log('Error registrandose-> ', error);
      Swal.fire('Oops...', 'Parece que hubo un problema con el archivo, revisa su extension e intenta de nuevo', 'error');
      this.progress = 0;
    });
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1';
  }

  //Drop listener
  @HostListener('drop', ['$event'])
  public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1';
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  deleteFile(id: any) {
     this.eventoService.deleteFile(id).subscribe(dataz => {
       Swal.fire('Success', 'Borrado exitosamente', 'success');
       window.location.reload();
     }, error => {
      console.log('Error registrandose-> ', error);
      Swal.fire('Success', 'Oops, parece que hubo un problema', 'error');
      this.progress = 0;
    });
  }
}
