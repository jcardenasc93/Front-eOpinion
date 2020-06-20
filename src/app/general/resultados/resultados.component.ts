import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {PreguntaService} from "../../services/pregunta.service";
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import * as XLSX from 'xlsx';
import {UsuariosService} from "../../services/usuarios.service";
import {ActivatedRoute} from "@angular/router";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";


class Enum {
  id: any;
  coeficiente: any;
  opcion: any;
  index: any;
  votos: any;
  porcentaje: number;
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  private totalasambleistas = 0;
  private votos = [];
  public user: any;


  constructor(private route: ActivatedRoute, private preguntaService: PreguntaService,
              private userService: UsuariosService, @Inject(MAT_DIALOG_DATA) public data: { pregunta, idEvento }) {
    if (this.puntajeXcoeficiente == true) {
      this.displayedColumns = ['opcion', 'descripcion', 'inmuebles', 'coeficiente', 'porcentaje'];
    } else {
      this.displayedColumns = ['opcion', 'descripcion', 'inmuebles', 'porcentaje'];
    }
  }

  displayedColumns: string[] = ['opcion', 'descripcion', 'inmuebles', 'porcentaje'];

  public coeficientes = [];
  public porcentaje = [];
  public tortaLables = [];

  public opciones: Array<Enum> = [];

  public puntajeXcoeficiente = this.data.pregunta.puntajeCoeficiente;


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData = [
    {
      data: this.coeficientes, label: 'COEFICIENTE'
    }
  ];
  public barChartDataNominal = [
    {
      data: this.votos, label: '# Votos'
    }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label(tooltipItem, data) {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipLabel = data.labels[tooltipItem.index];
          const tooltipData = allData[tooltipItem.index];
          return tooltipLabel + ': ' + tooltipData + '%';
        }
      }
    }
  };
  public pieChartLabels: Label[] = this.tortaLables;
  public pieChartData: number[] = this.porcentaje;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', '#f6d186'
      , '#6886c5', '#f5a7a7', '#c06c84', '#f6d186', '#a8e6cf', '#f6d186', '#be9fe1', '#9cf196',
      '#96f7d2', '#484c7f', '#c36a2d', '#d8345f', '#445c3c', '#a4d7e1', '#ff8364', '#ef6c57',],
    },
  ];



  dataSource: any;
  @ViewChild('TABLE') table: ElementRef;


  ngOnInit(): void {
    this.getAsamblesitas();
    this.getOpciones();
    this.getCoeficienteXrespuesta();
    this.getCurrentUser();
  }

  getOpciones() {
    let cont = 1;
    this.data.pregunta.opciones.forEach(dataItem => {
      this.barChartLabels.push(cont);
      this.tortaLables.push(cont)
      cont++;
    });
    this.barChartLabels.push('NS/NR');
    this.tortaLables.push('NS/NR');
  }

  getAsamblesitas() {
    this.userService.getAsableistasXEvento(this.data.idEvento).subscribe(data => {

        this.totalasambleistas = data.asambleistas.length;
        console.log('sd', this.totalasambleistas);

      },
      error => {
        console.log('Error trayendo pregunta multiple', this.data.pregunta);
      }
    );

  }

  getCoeficienteXrespuesta() {
    this.userService.getAsableistasXEvento(this.data.idEvento).subscribe(datax => {
        this.totalasambleistas = datax.asambleistas.length;
        this.preguntaService.getRespuestas(this.data.pregunta.id).subscribe(data => {
            let cont = 1;
            this.data.pregunta.opciones.forEach(dataItem => {
              const opcion = new Enum();
              opcion.index = cont;
              opcion.id = dataItem.id;
              opcion.opcion = dataItem.opcion;
              opcion.votos = 0;
              opcion.coeficiente = 0;
              opcion.porcentaje = 0;
              this.opciones.push(opcion);
              cont++;
            });
            console.log('respuestas', data)
            console.log('pregunta', this.data.pregunta)
            //console.log('opciones respondidas', data[1].opciones)
            let i = 0;
            for (i; i < this.opciones.length; i++) {
              let j = 0;
              for (j; j < data.length; j++) {
                let k = 0;
                for (k; k < data[j].opciones.length; k++) {
                  if (this.opciones[i].id == data[j].opciones[k]) {
                    this.opciones[i].coeficiente = this.opciones[i].coeficiente + parseFloat(data[j].coeficientes);
                    this.opciones[i].votos = this.opciones[i].votos + data[j].votos;
                    this.opciones[i].porcentaje = this.opciones[i].votos / this.totalasambleistas * 100;
                  }
                }
              }
            }

            let coeficienteVotado = 0;
            let votosTotales = 0;
            this.opciones.forEach(dataItem => {
              coeficienteVotado = coeficienteVotado + dataItem.coeficiente;
              votosTotales = votosTotales + dataItem.votos;
              this.votos.push(dataItem.votos);
              this.coeficientes.push(dataItem.coeficiente);
              this.porcentaje.push(dataItem.porcentaje);
            });

            console.log('vootsso', this.totalasambleistas);

            const opcion2 = new Enum();
            opcion2.index = 'NS/NR';
            opcion2.opcion = 'NS/NR';
            opcion2.coeficiente = 100 - coeficienteVotado;
            opcion2.votos = this.totalasambleistas - votosTotales;
            opcion2.porcentaje = opcion2.votos / this.totalasambleistas * 100;
            this.opciones.push(opcion2);
            this.coeficientes.push(opcion2.coeficiente);
            this.votos.push(opcion2.votos);
            this.porcentaje.push(opcion2.porcentaje);
            console.log('coeficientes ', this.opciones);
            this.dataSource = this.opciones;
          },
          error => {
            console.log('Error trayendo pregunta multiple');
          }
        );


      }
      ,
      error => {
        console.log('Error trayendo pregunta multiple');
      }
    );


  }

  getCurrentUser(){
     this.userService.getUserByToken2().subscribe(datax => {
       console.log(datax)
       this.user = datax[0].username;
       console.log('usuario y tales', datax);
     },
          error => {
            console.log('Error trayendo pregunta multiple');
          }
        );
}

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}
