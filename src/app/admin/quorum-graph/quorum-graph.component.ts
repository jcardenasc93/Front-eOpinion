import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {PreguntaService} from "../../services/pregunta.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ChartOptions, ChartType} from "chart.js";
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from "ng2-charts";
import * as XLSX from "xlsx";
import {EventoService} from "../../services/evento.service";
import {UsuariosService} from "../../services/usuarios.service";
import {ExcelServiceService} from "../../services/excel-service.service";


class Enum {
  id: any;
  coeficiente: any;
  opcion: any;
  index: any;
  coeficienteAusente: any;
  date_time: any;
  votos: any;
  ausentes: any;
}


class Quorum {
  inmbueble: any;
  coeficiente: any;
  calidad: any;
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
  private quorum: Array<Quorum> = [];

  constructor(private preguntaService: PreguntaService,
              @Inject(MAT_DIALOG_DATA) public data: { idEvent },
              private usuarioService: UsuariosService,
              private excelService: ExcelServiceService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  displayedColumns: string[] = ['index', 'coeficientepresente', 'coeficienteausente', 'inmueblespresentes', 'inmueblesausentes', 'actions'];
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
      backgroundColor: ['#cbe2b0', '#ffb6b6'],
    },];

  public listaQoro = [];
  @ViewChild('TABLE') table: ElementRef;

  ngOnInit(): void {
    this.getQuorums();
  }

  getnewCoro(idQoro) {
    this.preguntaService.getNewQuorumXEvento(idQoro).subscribe(data => {
      console.log('nuevos qoros', data);

      data.forEach(dataItem => {
        const quoro = new Quorum();
        quoro.inmbueble = dataItem.inmueble;
        quoro.coeficiente = dataItem.coeficiente;
        if (dataItem.apoderado == true) {
          quoro.calidad = 'APODERADO';
        } else {
          quoro.calidad = 'PROPIETARIO';
        }
        this.quorum.push(quoro);
      });


      this.excelService.exportAsExcelFile(this.quorum, 'quorum');

      this.quorum = [];

    }, error => {
      Swal.fire('Error!', 'Error creando pregunta', 'error');
      console.log('error', error);
    });
  }

  getQuorums() {
    this.preguntaService.getQuorumXEvento(this.data.idEvent).subscribe(data => {
      this.usuarioService.getAsableistasXEvento(this.data.idEvent).subscribe(datax => {
        console.log('QUOROS', data);
        console.log('sambleistas leng', datax.asambleistas.length);
        data.quorums.forEach(dataItem => {
          const opcion = new Enum();
          opcion.coeficiente = dataItem.coeficiente_registrado;
          opcion.votos = dataItem.cantidadPersonas;
          opcion.ausentes = datax.asambleistas.length - dataItem.cantidadPersonas;
          opcion.coeficienteAusente = 100 - dataItem.coeficiente_registrado;
          opcion.date_time = dataItem.date_time.substring(11).slice(0, -13);
          opcion.id = dataItem.id;
          this.listaQoro.push(opcion);
        });
        this.dataSource = this.listaQoro.reverse();
        console.log('QUOROS', this.listaQoro);
      }, error => {
        Swal.fire('Error!', 'Error creando pregunta', 'error');
        console.log('error', error);
      });

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


  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  deleteQuoro(id) {
    this.preguntaService.deleteQuorum(id).subscribe(data => {
      Swal.fire('success!', 'borrado exitoso', 'success');
      window.location.reload();
    }, error => {
      Swal.fire('Error!', 'Error borrando quorum', 'error');
      console.log('error', error);
    });
  }

}
