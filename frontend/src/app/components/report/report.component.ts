import { Component, OnInit } from '@angular/core';
import { SurveyTest } from 'src/app/models/survey-test.model';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { ActivatedRoute } from '@angular/router';
import { Work } from 'src/app/models/work.model';
import { WorkService } from 'src/app/services/api/work.service';
import { Chart } from 'chart.js'
import { AnswerService } from 'src/app/services/api/answer.service';
import { Question } from 'src/app/models/question.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  id: string;
  current: SurveyTest;
  maxPoints: number;
  works: any[];
  graphData: number[]
  isSurvey: boolean;

  // For survey
  questions: Question[];
  

  constructor(
    private surveyTestService: SurveyTestService,
    private route: ActivatedRoute,
    private workService: WorkService,
    private answerService: AnswerService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    this.surveyTestService.getSingle(this.id).subscribe(
      survey => {

        this.current = survey[0];

        this.appComponent.changeHeader(this.current.title, "poll");

        this.isSurvey = (this.current.type == 0) ? true : false;

        this.workService.getFinishedWorks(this.id).subscribe(
          w => {
            this.works = w;
            
            if (this.current.type == 1){
              
              this.surveyTestService.getMaxPoints(this.id).subscribe(
                obj => {
                  this.maxPoints = obj[0].max_points;
  
                  this.graphData = [];
                  for (var i = 0; i < 10; i++){
                    this.graphData.push(0);
                  }
  
                  this.works.forEach(w => {
                    
                    var percent = (w.total_points / this.maxPoints) * 100;
  
                    var ind = 0;
                    if (percent != 0){
                      ind = Math.floor((percent - 1) / 10);
                    }
  
                    this.graphData[ind]++;
  
                  });
                  
                  var ctx = document.getElementById('myChart');
                  var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: [
                          '0 - 10',
                          '11 - 20',
                          '21 - 30',
                          '31 - 40',
                          '41 - 50',
                          '51 - 60',
                          '61 - 70',
                          '71 - 80',
                          '81 - 90',
                          '91 - 100'
                        ],
                        datasets: [{
                            label: '',
                            data: this.graphData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend : {
                          display: false
                        }
                    }
                });
  
                }
              )

            }
            else{

              this.surveyTestService.getQuestions(this.current.id).subscribe(
                questions => {

                  this.questions = questions;
                  
                  for (var k = 0; k < this.questions.length; k++){
                    
                    let q = this.questions[k];

                    let solutions = JSON.parse(q.solutions);

                    q.labels = solutions.labels;

                    this.GetQuestionAnswers(q, k);

                  }

                }
              )

            }

          }
        );

      }
    );

  }

  GetQuestionAnswers(q, k){

    this.answerService.getQuestionAnswers(q.id, this.current.id).subscribe(
      answers => {
        
        for (var i = 0; i < q.labels.length; i++){

          let mapa = new Map();

          for (var j = 0; j < answers.length; j++){

            let ans = JSON.parse(answers[j].answers);
            
            if (mapa.has(ans[i])){
              let val = mapa.get(ans[i]);
              mapa.set(ans[i], val + 1);
            }
            else{
              mapa.set(ans[i], 1);
            }

          }

          this.UpdateChart(k, i, mapa);
        }

      }
    )

  }

  UpdateChart(k, i, mapa: Map<any,any>){

    var ctx = document.getElementById('chart'+k +'-'+i);

    let labels = [];
    let counts = [];

    for (let entry of mapa.entries()){
      labels.push(entry[0]);
      counts.push(entry[1]);
    }


    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: labels,
          datasets: [{
              data: counts,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
      },
      options: {
          
      }
  });

  }

}
