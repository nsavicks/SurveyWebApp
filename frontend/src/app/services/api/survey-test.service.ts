import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SurveyTest } from 'src/app/models/survey-test.model';
import { Question } from 'src/app/models/question.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SurveyTestService {

  constructor(private http: HttpClient) { }

  getAllSurveys(): Observable<SurveyTest[]> {
    return this.http.get<SurveyTest[]>('http://localhost:5000/api/survey-test/surveys');
  }

  getAllSurveysForAuthor(username): Observable<SurveyTest[]> {
    return this.http.get<SurveyTest[]>('http://localhost:5000/api/survey-test/surveys/' + username);
  }

  getAllTests(): Observable<SurveyTest[]> {
    return this.http.get<SurveyTest[]>('http://localhost:5000/api/survey-test/tests');
  }

  getAllTestsForAuthor(username): Observable<SurveyTest[]> {
    return this.http.get<SurveyTest[]>('http://localhost:5000/api/survey-test/tests/' + username);
  }

  getSingle(id): Observable<SurveyTest> {
    return this.http.get<SurveyTest>('http://localhost:5000/api/survey-test/getSingle/' + id);
  }

  getQuestions(id): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:5000/api/survey-test/getQuestions/' + id);
  }

  getMaxPoints(id): Observable<object> {
    return this.http.get('http://localhost:5000/api/survey-test/getMaxPoints/' + id);
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:5000/api/survey-test/getAllQuestions/');
  }

  addSurveyTest(survey): any {
    return this.http.post('http://localhost:5000/api/survey-test/add', survey);
  }

  addQuestion(question): any {
    return this.http.post('http://localhost:5000/api/survey-test/addQuestion', question);
  }

  addHasQuestion(survey, question, ord, points): any {
    return this.http.post('http://localhost:5000/api/survey-test/addHasQuestion', [survey, question, ord, points]);
  }

  deleteSurveyTest(sid): any{
    return this.http.delete('http://localhost:5000/api/survey-test/delete/' + sid, httpOptions);
  }

}
