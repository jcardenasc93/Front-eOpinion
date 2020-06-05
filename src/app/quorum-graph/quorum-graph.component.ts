import {Component, Inject, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {PreguntaService} from "../services/pregunta.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ChartOptions, ChartType} from "chart.js";
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from "ng2-charts";


class Enum {
  id: any;
  coeficiente: any;
  opcion: any;
  index: any;
  coeficienteAusente: any;
  date_time: any;
}

@Component({
  selector: 'app-quorum-graph',
  templateUrl: './quorum-graph.component.html',
  styleUrls: ['./quorum-graph.component.css']
})
export class QuorumGraphComponent implements OnInit {
  public dataSource: any;
  selectedRowIndex: number = -1;
  public titulo;

  constructor(private preguntaService: PreguntaService,
              @Inject(MAT_DIALOG_DATA) public data: { idEvent }) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  displayedColumns: string[] = ['index', 'coeficientepresente', 'coeficienteausente', 'inmueblespresentes', 'inmueblesausentes'];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Presente'], ['Ausente']];
  public pieChartData: number[] = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['green', 'red'],
    },];

  public listaQoro = [];


  ngOnInit(): void {
    this.getQuorums();
  }

  getQuorums() {
    this.preguntaService.getQuorumXEvento(this.data.idEvent).subscribe(data => {
      console.log('QUOROS', data);
      //data[0].coeficiente_registrado;
      data.quorums.forEach(dataItem => {
        const opcion = new Enum();
        opcion.coeficiente = dataItem.coeficiente_registrado;
        opcion.coeficienteAusente = 100 - dataItem.coeficiente_registrado;
        opcion.date_time = dataItem.date_time.substring(11).slice(0,-13);
        this.listaQoro.push(opcion);
      });
      this.dataSource = this.listaQoro;
      console.log('QUOROS', this.listaQoro);
    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
      console.log('error', error);
    });
  }


  updateTable(row: any) {
    console.log(row)
    this.pieChartData = [row.coeficiente, row.coeficienteAusente];
    this.titulo = row.date_time;
  }
}
