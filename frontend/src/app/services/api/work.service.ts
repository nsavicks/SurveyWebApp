import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Work } from 'src/app/models/work.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private http: HttpClient) { }

  getWork(username, id): Observable<Work> {
    return this.http.get<Work>('http://localhost:5000/api/work/getWork/' + username + '&' + id);
  }

  getFinishedWorks(id): Observable<Object[]> {
    return this.http.get<Object[]>('http://localhost:5000/api/work/getFinishedWorks/' + id);
  }

  getQA(username, id): Observable<Object[]> {
    return this.http.get<Object[]>('http://localhost:5000/api/work/getQA/' + username + '&' + id);
  }

  addWork(user, survey, finished, time, points) {
    return this.http.post('http://localhost:5000/api/work/add', [user, survey, finished, time, points]);
  }

  deleteWork(username, sid) {
    return this.http.delete('http://localhost:5000/api/work/deleteWork/' + sid + '&' + username);
  }
  
}
