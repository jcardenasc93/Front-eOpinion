import {Component, OnInit} from '@angular/core';
import {PreguntaMultipleComponent} from "../pregunta/pregunta-multiple/pregunta-multiple.component";
import {MatDialog} from "@angular/material/dialog";
import {PreguntaAbiertaComponent} from "../pregunta/pregunta-abierta/pregunta-abierta.component";
import {EventoService} from "../services/evento.service";
import {PreguntaService} from "../services/pregunta.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-pregunta',
  templateUrl: './admin-pregunta.component.html',
  styleUrls: ['./admin-pregunta.component.css']
})
export class AdminPreguntaComponent implements OnInit {
  selected: number;
  private idEvent;
  public pAbierta;
  public pMultiple;
  public pAbiertaDec;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private preguntaService: PreguntaService) {
  }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('idEvento');
    this.getPreguntasAbiertas();
    this.getPreguntasMultiples();
    this.getPreguntasAbiertasDecimal();
  }

  getPreguntasAbiertas(){
      this.preguntaService.getPreguntaAbierta(this.idEvent).subscribe(data => {
        this.pAbierta = data.pregunta_abierta;
        console.log('preguntas abiertas', data.pregunta_abierta);
      }, error => {
      console.log('Error login-> ', error);
    });
  }

  getPreguntasMultiples(){
      this.preguntaService.getPreguntaMultiple(this.idEvent).subscribe(data => {
        this.pMultiple = data.pregunta_multiple;
        console.log('preguntas multiples', data.pregunta_multiple);
      }, error => {
      console.log('Error login-> ', error);
    });
  }

  getPreguntasAbiertasDecimal(){
      this.preguntaService.getPreguntaAbiertaDecimal(this.idEvent).subscribe(data => {
        this.pAbiertaDec = data.pregunta_decimal;
        console.log('preguntas abiertas decimal', data.pregunta_decimal);
      }, error => {
      console.log('Error login-> ', error);
    });
  }



  openPregunta(tipoPregunta): void{
    if (tipoPregunta == 4){
       this.openPreguntaMultipleModal();
    }
    if (tipoPregunta == 1){
       this.openPreguntaAbiertaModal();
    }
  }


  openPreguntaMultipleModal(): void {
    const selected = 1;
    this.dialog.open(PreguntaMultipleComponent, {
      width: '70%',
     data: {
        idEvento: this.idEvent,
      }
    });
  }


  openPreguntaAbiertaModal(): void {
    const selected = 1;
    this.dialog.open(PreguntaAbiertaComponent, {
      width: '70%',
      data: {
        idEvento: this.idEvent,
      }
    });
  }

}
