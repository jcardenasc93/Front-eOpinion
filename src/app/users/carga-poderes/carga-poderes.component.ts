import {Component, EventEmitter, Inject, OnInit, Directive, Output, Input,  HostBinding, HostListener } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PreguntaService} from "../../services/pregunta.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {UsuariosService} from "../../services/usuarios.service";

@Component({
  selector: 'app-carga-poderes',
  templateUrl: './carga-poderes.component.html',
  styleUrls: ['./carga-poderes.component.css']
})
export class CargaPoderesComponent implements OnInit {
  questionForm: FormGroup;
  file;
  files: any = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UsuariosService,
              public dialogRef: MatDialogRef<CargaPoderesComponent>) {
  }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.questionForm = this.formBuilder.group({
      opciones: this.formBuilder.array([]),
    });
  }


  subirPoder() {
    this.userService.crearPoder(this.questionForm).subscribe(data => {

    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.questionForm.get('file').setValue(file);
    }
  }




  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }


}
