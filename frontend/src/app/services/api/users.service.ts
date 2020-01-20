import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/api/users/');
  }

  getPendingUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/api/users/getPending');
  }

  getUsersWithUsernameLike(username: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/api/users/getUsersWithUsernameLike/' + username);
  }

  getPendingUsersWithUsernameLike(username: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/api/users/getPendingUsersWithUsernameLike/' + username);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:5000/api/users', user, httpOptions);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:5000/api/users/updateUser', user, httpOptions);
  }

  getCountUsersWithEmail(email: string): any{
    return this.http.get('http://localhost:5000/api/users/getCountWithEmail/' + email,  httpOptions);
  }

  getUserWithUsername(username: string): any{
    return this.http.get<User>('http://localhost:5000/api/users/getUser/' + username,  httpOptions);
  }

  getUserWithJMBG(jmbg: string): any{
    return this.http.get<User>('http://localhost:5000/api/users/getUserJMBG/' + jmbg,  httpOptions);
  }

  getToken(user: User): any{
    return this.http.post('http://localhost:5000/api/users/getToken', user, httpOptions);
  }

  acceptUser(username: string): any{
    return this.http.put('http://localhost:5000/api/users/acceptUser/' + username, httpOptions);
  }

  changePassword(username: string, password: string): any{
    return this.http.put('http://localhost:5000/api/users/change-password/' + username + "&" + password, httpOptions);
  }

  deleteUser(username: string):any {
    return this.http.delete('http://localhost:5000/api/users/deleteUser/' + username, httpOptions);
  }

}
