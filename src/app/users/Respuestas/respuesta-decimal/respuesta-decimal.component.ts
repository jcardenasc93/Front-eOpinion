import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreguntaService} from "../../../services/pregunta.service";
import Swal from "sweetalert2";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-respuesta-decimal',
  templateUrl: './respuesta-decimal.component.html',
  styleUrls: ['./respuesta-decimal.component.css']
})
export class RespuestaDecimalComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public questionForm: FormGroup;
  respuesta_decimal = this.data.preguntaDecimal.enunciado;
  public countDown;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { preguntaDecimal },
              private preguntaService: PreguntaService, private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<RespuestaDecimalComponent>) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setTimer();
  }

  setTimer() {
    const today = new Date();
    const currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const endTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + this.data.preguntaDecimal.time_final;
    const currentTimeToDate = Date.parse(currentTime);
    const endTimeDate = Date.parse(endTime);
    this.countDown = (endTimeDate - currentTimeToDate) / 1000;
  }


  initializeForm() {
    this.questionForm = this.formBuilder.group({
      respuesta_decimal: ['', [Validators.required, Validators.min(this.data.preguntaDecimal.minimo), Validators.max(this.data.preguntaDecimal.maximo)]],
    });
  }

  enviarRespuesta() {
    this.preguntaService.saveRespuestaDecimal(this.questionForm.get('respuesta_decimal').value.toFixed(3), this.data.preguntaDecimal.id).subscribe(async data => {
      Swal.fire('Success!', 'Respuesta guardada exitosamente', 'success');
      await this.delay(2500);
      this.dialogRef.close();
      //window.location.reload();
    }, error => {
      console.log('error', error.error)
      Swal.fire('Error!', error.error.detail, 'error');
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
