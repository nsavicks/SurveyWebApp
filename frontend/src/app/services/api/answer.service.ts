import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Answer } from 'src/app/models/answer.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswer(qid, username, sid): Observable<Answer> {
    return this.http.get<Answer>('http://localhost:5000/api/answer/getAnswer/' + qid + '&' + username + '&' + sid);
  }

  addAnswer(answer, points) {
    return this.http.post('http://localhost:5000/api/answer/add', [answer, points]);
  }

  deleteAnswers(username, sid) {
    return this.http.delete('http://localhost:5000/api/answer/deleteAnswers/' + sid + '&' + username);
  }
}
