import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreguntaService} from "../../../services/pregunta.service";
import Swal from "sweetalert2";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-respuesta-abierta',
  templateUrl: './respuesta-abierta.component.html',
  styleUrls: ['./respuesta-abierta.component.css']
})
export class RespuestaAbiertaComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public enunciado = this.data.preguntaAbierta.enunciado;
  public timer = this.data.preguntaAbierta.time_final
  questionForm: any;
  public currentime = 100;
  public countDown;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { preguntaAbierta },
              private preguntaService: PreguntaService,
              public dialogRef: MatDialogRef<RespuestaAbiertaComponent>) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.setTimer();
  }

  setTimer() {
    const today = new Date();
    const currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const endTime =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + this.data.preguntaAbierta.time_final;
    const currentTimeToDate = Date.parse(currentTime);
    const endTimeDate = Date.parse(endTime);
    this.countDown = (endTimeDate-currentTimeToDate)/1000;
  }


  /*const unixTimeZero = Date.parse('05 29 2020 11:19:30');
const javaScriptRelease = Date.parse('05 29 2020 11:18:00');
let today = new Date();
let currentTime=

const per =unixTimeZero-javaScriptRelease
console.log(unixTimeZero);
console.log(per/1000);
console.log(currentTime);
*/


  initializeForm() {
    this.questionForm = this.formBuilder.group({
      enunciado: ['', [Validators.required]],
    });
  }


  enviarRespuesta() {
    this.preguntaService.saveRespuestaAbierta(this.questionForm.get('enunciado').value, this.data.preguntaAbierta.id).subscribe(async data => {
      Swal.fire('Success!', 'Respuesta guardada exitosamente', 'success');
      await this.delay(2500);
      this.dialogRef.close();
      //window.location.reload();
    }, error => {
      console.log('error', error)
      if(error.error.detail==undefined){
        Swal.fire('Error!', 'Excedió el límite de caracteres permitido', 'error');
      }else{
        Swal.fire('Error!', error.error.detail, 'error');
      }
    });
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
