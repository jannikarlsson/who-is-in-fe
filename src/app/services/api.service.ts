import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Row } from '../models/row';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private baseUrl = 'http://localhost:3000/api';
  private baseUrl = 'https://who-is-in.onrender.com/api';
  private logUrl = '/log';
  private loginUrl = '/users/login';

  constructor(private http: HttpClient) {}

  getWeeklyLogs(year: number, week: number) {
    return this.http
      .get<Row[]>(`${this.baseUrl}${this.logUrl}/${year}/${week}`)
  }
  
  postLogRow(value: Row) {
    return this.http.post(`${this.baseUrl}${this.logUrl}`, {
      value
    })
  }

  patchLogRow(value: Row) {
    return this.http.patch(`${this.baseUrl}${this.logUrl}/${value.id}`, {
      value
    })
  }

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}${this.loginUrl}`, { username, password })
  }
}
