import {Component, OnInit} from '@angular/core';
import {PreguntaMultipleComponent} from "../pregunta/pregunta-multiple/pregunta-multiple.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-pregunta',
  templateUrl: './admin-pregunta.component.html',
  styleUrls: ['./admin-pregunta.component.css']
})
export class AdminPreguntaComponent implements OnInit {
  selected: number;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openPregunta(tipoPregunta): void{
    if (tipoPregunta == 4){
       this.openPreguntaVofModal();
    }



  }


  openPreguntaVofModal(): void {
    const selected = 1;
    this.dialog.open(PreguntaMultipleComponent, {
      width: '70%',
      data: {
        selected
      }
    });
  }

}
