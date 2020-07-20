import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-timmer',
  templateUrl: './timmer.component.html',
  styleUrls: ['./timmer.component.css']
})
export class TimmerComponent implements OnInit {
  public countDown;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { pregunta }) {

  }

  ngOnInit(): void {
    this.setTimer();
  }

  setTimer() {
    if (this.data.pregunta.activa == false) {
      this.countDown = 0;
    } else {
      const today = new Date();
      const currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const endTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + this.data.pregunta.time_final;
      const currentTimeToDate = Date.parse(currentTime);
      const endTimeDate = Date.parse(endTime);
      this.countDown = (endTimeDate - currentTimeToDate) / 1000;
      console.log('cundonw', this.data.pregunta);
    }
  }


}
