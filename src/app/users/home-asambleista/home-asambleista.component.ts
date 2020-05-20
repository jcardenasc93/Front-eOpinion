import { Component, OnInit } from '@angular/core';
import {PreguntaMultipleComponent} from "../../admin/pregunta/pregunta-multiple/pregunta-multiple.component";
import {MatDialog} from "@angular/material/dialog";
import {CargaPoderesComponent} from "../carga-poderes/carga-poderes.component";

@Component({
  selector: 'app-home-asambleista',
  templateUrl: './home-asambleista.component.html',
  styleUrls: ['./home-asambleista.component.css']
})
export class HomeAsambleistaComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

    openPoderesModal(): void {
    this.dialog.open(CargaPoderesComponent, {
      width: '70%',
    });
  }


}
