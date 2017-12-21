import { Component,ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Chart } from 'chart.js';
/*
  Generated class for the His page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-his',
  templateUrl: 'his.html'
})
export class HisPage {

  @ViewChild('barCanvas') barCanvas;
   @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    constructor(public navCtrl: NavController) {
 
    }
 
    ionViewDidLoad() {
 
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
                datasets: [{
                    label: 'Frequency of charging',
                    data: [12, 19, 3, 5, 2, 3,4,10,20,4,6,7],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(250, 128, 114,0.2)',
                        'rgba(142, 69, 133,0.2)',
                        'rgba(70, 130, 180,0.2)',
                        'rgba(244, 66, 206,0.2)',
                        'rgba((152, 244, 65,0.2)',
                        'rgba(65, 205, 244,0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(250, 128, 114,1)',
                        'rgba(142, 69, 133,1)',
                        'rgba(70, 130, 180,1)',
                        'rgba(244, 66, 206,1)',
                        'rgba((152, 244, 65,1)',
                        'rgba(65, 205, 244,1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });


         this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
                datasets: [{
                    label: 'Frequency of charging',
                    data: [12, 19, 3, 5, 2, 3,4,10,20,4,6,7],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(250, 128, 114,0.2)',
                        'rgba(142, 69, 133,0.2)',
                        'rgba(70, 130, 180,0.2)',
                        'rgba(244, 66, 206,0.2)',
                        'rgba((152, 244, 65,0.2)',
                        'rgba(65, 205, 244,0.2)',
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        
                       
                    ]
                }]
            }
 
        });
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
                datasets: [
                    {
                        label: "Charging Frequency",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40,33,12,66,77,88],
                        spanGaps: false,
                    }
                ]
            }
 
        });
 
    

 // constructor(public navCtrl: NavController, public navParams: NavParams) {}

 // ionViewDidLoad() {
  //  console.log('ionViewDidLoad HisPage');
 // }

}}
