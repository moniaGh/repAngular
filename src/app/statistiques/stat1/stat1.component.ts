import { Component, OnInit } from '@angular/core';
import { CorrespondantService } from 'src/app/services/correspondant.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-stat1',
  templateUrl: './stat1.component.html',
  styleUrls: ['./stat1.component.css']
})
export class Stat1Component implements OnInit {

  public pieChartOptions: ChartOptions= {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];

// Start BarChart declaration One---------------------------------------------

    public barChartOptions: ChartOptions = {
      responsive: true,
      scales: { xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    public barChartLabels: Label[];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
  
    public barChartData: ChartDataSets[] = [
      {data: [], label: ''}
    ];
  
// end BarCHart declaration One---------------------------------------------

  // Doughnut
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  private donutColors=[
    {
      backgroundColor: [
        'rgba(178, 199, 111, 1)',
        'rgba(202, 134, 23, 1)',
        'rgba(247, 224, 51, 1)',
        'rgba(252, 228, 42, 1)',
        'rgba(178, 180, 112, 1)',
        'rgba(240, 228, 42, 1)',
        'rgba(220, 134, 23, 1)',
    ]
    }
  ];

// Start BarChart declaration Two ---------------------------------------------

public barChartOptionsTwo: ChartOptions = {
  responsive: true,
  scales: { xAxes: [{}], yAxes: [{
    ticks: {
      beginAtZero: true
    }
  }] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
public barChartLabelsTwo: Label[];
public barChartTypeTwo: ChartType = 'bar';
public barChartLegendTwo = true;

public barChartDataTwo: ChartDataSets[] = [
  {data: [], label: ''}
];

// end BarCHart declaration Two ---------------------------------------------

  constructor( private http: HttpClient, private correspondantService: CorrespondantService, private router: Router) { }

  ngOnInit() {
    
    this.getPieChartData();
    this.getBarChartData();
    this.getdoughnutChart();
    this.getBarChartDataTwo();
  }
  getPieChartData(){

    var pieChartData: Object[] = [];
    this.http.get<any>(this.correspondantService.urlFonds + '/value').
    subscribe(
      rep => {
        pieChartData=rep;
        this.pieChartLabels = pieChartData.map(item => item[0]);
        this.pieChartData =  pieChartData.map(item => item[1]);
      },
      error => { console.log(error) });
  }

  getBarChartData(){
    var barChartData: Object[] = []

    this.http.get<any>(this.correspondantService.urlFonds + '/value/money').
    subscribe(
      rep => {
        barChartData=rep;
        var item = {data: [], label: '' };

        var localData = []
        this.barChartLabels = ['']
    
        for (let i = 0; i < barChartData.length; i++) {
          item["data"].push(barChartData[i][2])
          item["label"] = barChartData[i][0]
          localData.push(item)
          item = { data: [], label: ''};
        }
        this.barChartData = localData
      },
      error => { console.log(error) });
  }



  public getdoughnutChart(){

    var doughnutChartData:Object[] = []

    this.http.get<any>(this.correspondantService.urlFonds + '/value/statut').
    subscribe(
      rep => {
        doughnutChartData = rep;
        console.log(rep)
        this.doughnutChartLabels = doughnutChartData.map(item => item[0])
        var localData = doughnutChartData.map(item =>item[1])
        console.log(localData)
        this.doughnutChartData=localData
      },
      error => { console.log(error) });
  }


  getBarChartDataTwo(){
    var barChartData: Object[] = []

    this.http.get<any>(this.correspondantService.urlFonds + '/value/ben').
    subscribe(
      rep => {
        barChartData=rep;
        var item = {data: [], label: '' };

        var localData = []
        this.barChartLabelsTwo = ['']
    
        for (let i = 0; i < barChartData.length; i++) {
          item["data"].push(barChartData[i][2])
          item["label"] = barChartData[i][0]
          localData.push(item)
          item = { data: [], label: ''};
        }
        this.barChartDataTwo = localData
      },
      error => { console.log(error) });
  }

}




