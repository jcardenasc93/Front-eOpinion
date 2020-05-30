import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {PreguntaService} from "../../../services/pregunta.service";
import Swal from "sweetalert2";
import {log} from "util";

class PreguntaAbierta {
  enunciado: any;
  activa: any;
  respuestasPermitidas: any;
  opciones: [];
}


class Opciones {
  id: any;
  opcion: any;
  check: any;
  numero: any;
  letra: any;
}

class Enum {
  number: number;
  letra: string;
}


@Component({
  selector: 'app-respuesta-multiple',
  templateUrl: './respuesta-multiple.component.html',
  styleUrls: ['./respuesta-multiple.component.css']
})
export class RespuestaMultipleComponent implements OnInit {

  public questionForm;
  public opciones: Array<Opciones> = [];
  public enunciado = this.data.preguntaMultiple.enunciado;
  public mensajeEnunciado;
  public alphabet = 'aabcdefghijklmnopqrstuvwxyz';
  public enum: Array<Enum> = [];
  public countDown;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { preguntaMultiple },
              private preguntaService: PreguntaService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setTimer();
  }

  setTimer() {
    const today = new Date();
    const currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const endTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + this.data.preguntaMultiple.time_final;
    const currentTimeToDate = Date.parse(currentTime);
    const endTimeDate = Date.parse(endTime);
    this.countDown = (endTimeDate - currentTimeToDate) / 1000;
    console.log('cundonw', this.data.preguntaMultiple);
  }

  initializeForm() {
    let i = 0;

    for (i = 1; i < this.alphabet.length; i++) {
      const list = new Enum();
      list.letra = this.alphabet[i];
      list.number = i;
      this.enum.push(list);
    }
    let j = 0;


    this.data.preguntaMultiple.opciones.forEach(dataItem => {
      const opcion = new Opciones();
      opcion.id = dataItem.id;
      opcion.opcion = dataItem.opcion;
      if (this.data.preguntaMultiple.numeracion == true) {
        opcion.numero = this.enum[j].number;
      } else {
        opcion.letra = this.enum[j].letra;
      }
      this.opciones.push(opcion);
      j++;

    });
    if (this.data.preguntaMultiple.respuestasPermitidas == 1) {
      this.mensajeEnunciado = 'Seleccione solo 1 de las siguientes opciones';
    } else {
      if (this.data.preguntaMultiple.strictMax == true) {
        this.mensajeEnunciado = 'Seleccione ' + this.data.preguntaMultiple.respuestasPermitidas + ' de las siguientes opciones';
      } else {
        this.mensajeEnunciado = 'Seleccione hasta ' + this.data.preguntaMultiple.respuestasPermitidas + ' de las siguientes opciones';
      }
    }


  }

  enviarRespuestas() {
    let opInt = [];
    this.opciones.forEach(dataItem => {
      if (dataItem.check == true) {
        opInt.push(dataItem.id);
      }
    });
    if (opInt.length > 1 && this.data.preguntaMultiple.respuestasPermitidas == 1) {
       Swal.fire('Error!', 'Solo debe seleccionar una opcion de respuesta', 'error');
       return;
    }
    if (opInt.length == 0) {
      Swal.fire('Error!', 'Seleccione al menos una opcion de respuesta', 'error');
      return;
    }

    this.preguntaService.saveMultipleRespuesta(opInt, this.data.preguntaMultiple.id).subscribe(data => {
      Swal.fire('Success!', 'Su respuesta ha sido guardada', 'success');
    }, error => {
      Swal.fire('Error!', error.error.detail, 'error');
      console.log('error', error.error.detail);
    });
  }


  checkOptionAnswer(value, idOptionSelected) {
    this.opciones.forEach(answer => {
      if (answer.id === idOptionSelected) {
        answer.check = value;
      }
    });
  }

}
