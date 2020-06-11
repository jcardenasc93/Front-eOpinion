import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UsuariosService} from "../services/usuarios.service";
import {PreguntaService} from "../services/pregunta.service";

class RespAbierta {
  inmueble: any;
  pregunta: any;
  respuesta: any;
  coeficiente: any;
  votos: any;
  opcion: any;
  apoderado: any;
  index: any;
}

@Component({
  selector: 'app-promedio-decimal',
  templateUrl: './promedio-decimal.component.html',
  styleUrls: ['./promedio-decimal.component.css']
})
export class PromedioDecimalComponent implements OnInit {
  private respDecimal: Array<RespAbierta> = [];
  public promedio: number;
  public totalVotos: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { pregunta, idEvento },
              public userService: UsuariosService,
              public preguntaService: PreguntaService
  ) {
  }

  ngOnInit(): void {
    this.getAnswersDecimalByAsambleista();
  }

  getAnswersDecimalByAsambleista() {
    this.userService.getAsableistasXEvento(this.data.idEvento).subscribe(datax => {
      //console.log('asambleustas', datax.asambleistas);
      this.preguntaService.getRespuestasDecimales(this.data.pregunta.id).subscribe(async repuestasXpregunta => {
        repuestasXpregunta.forEach(dataItemz => {
          const respuesta = new RespAbierta();
          datax.asambleistas.forEach(asambleista => {
            if (asambleista.id == dataItemz.asambleista) {
              respuesta.respuesta = dataItemz.respuesta_decimal;
              respuesta.index = asambleista.id;
              console.log('respuestas asam', dataItemz.respuesta_decimal);
              respuesta.votos = 1;
              this.respDecimal.push(respuesta);
              return;
            }

          });
        });
        console.log('resp', this.respDecimal)
        this.userService.getAsableistasXEvento(this.data.idEvento).subscribe(datas => {

          this.userService.getPoderXAsamblea(this.data.idEvento).subscribe(data => {
            let i = 0;

            for (i; i < datas.asambleistas.length; i++) {
              let j = 0;
              for (j; j < data.apoderados.length; j++) {
                if (datas.asambleistas[i].id == data.apoderados[j].representado_por && data.apoderados[j].validado == true) {
                  let k = 0;
                  for (k; k < this.respDecimal.length; k++) {
                    if (this.respDecimal[k].index == datas.asambleistas[i].id) {
                      this.respDecimal[k].votos = this.respDecimal[k].votos + 1;
                      console.log('votos', this.respDecimal[k].votos);
                    }
                  }
                }

              }
            }
          }, error => {
            console.log('Error trayendo pregunta multiple');
          });
        }, error => {
          console.log('Error trayendo pregunta multiple');
        });
        let prom = 0;
        let votos = 0;

        console.log('this.respDecimal', this.respDecimal)
        await this.delay(2500);

        let m = 0;
        for (m; m < this.respDecimal.length; m++) {
          prom = prom + (this.respDecimal[m].respuesta * this.respDecimal[m].votos);
          votos = votos + this.respDecimal[m].votos;
          console.log('prom', this.respDecimal[m]);
        }
        this.totalVotos = votos;

        this.promedio = prom / votos;

      }, error => {
        console.log('error', error.error);
      });


      this.respDecimal = [];
    }, error => {
      console.log('Error trayendo pregunta multiple');
    });

  }
    delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
