import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Directive,
  Output,
  Input,
  HostBinding,
  HostListener
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PreguntaService} from "../../services/pregunta.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {UsuariosService} from "../../services/usuarios.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-carga-poderes',
  templateUrl: './carga-poderes.component.html',
  styleUrls: ['./carga-poderes.component.css']
})
export class CargaPoderesComponent implements OnInit {
  questionForm: FormGroup;
  file;
  files: any = [];
  progress = 0;
  dataSource;
  displayedColumns: string[] = ['position', 'name'];

  constructor(private formBuilder: FormBuilder,
              private userService: UsuariosService,
              public dialogRef: MatDialogRef<CargaPoderesComponent>) {
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.getPoderesXusuario();
  }

  iniciarForm() {
    this.questionForm = this.formBuilder.group({
      opciones: this.formBuilder.array([]),
    });
  }


  getPoderesXusuario() {
    this.userService.getPoderXusuario().subscribe(data => {

      let x;
      let i = 0;
      var a = "";
      for (i = 0; i < data.length; i++) {
        try {
          data[i].documento_poder = data[i].documento_poder.substring(data[i].documento_poder.lastIndexOf('/') + 1);
        } catch (err) {
          data[i].documento_poder = "Null";
        }
        console.log('nombre archivo', data[i].documento_poder);
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
    this.userService.getUserByToken(sessionStorage.getItem('token')).subscribe(data => {
      const evento = data[0].evento;
      console.log('data evento x', evento);
      this.userService.crearPoder(this.files[0], evento).subscribe((event: HttpEvent<any>) => {
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
    }, error => {
      console.log('Error trayendo uruario x token ', error);
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
}
