import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../common_var';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  user = new Subject<any>();

  behuser = new BehaviorSubject<any>(null);

  getUser(): Observable<any> {
    const user: any = this.http.get(`${BASE_URL}/user`);
    return user;
  }
  getCompany(): Observable<any> {
    const user: any = this.http.get(`${BASE_URL}/company`);
    return user;
  }
  getRole(): Observable<any> {
    const user: any = this.http.get(`${BASE_URL}/roles`);
    return user;
  }
  getDesignation(): Observable<any> {
    const user: any = this.http.get(`${BASE_URL}/designation`);
    return user;
  }

  addUserOrupdateUser(payload: any): Observable<any> {
    return this.http.post(`${BASE_URL}/user`, payload);
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete(`${BASE_URL}/user/${userId}`);
  }

  toggleactivation(userId: any): Observable<any> {
    return this.http.patch(`${BASE_URL}/user`, { user_id: userId });
  }
}
