import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public ip = environment.backend;
  public urls = {
    signup: this.ip + 'user/signup',
    login: this.ip + 'user/login',
    verify: this.ip + 'user/verify',
  };

  constructor(private http: HttpClient) {
  }

  public login(data: any): Observable<any> {
    return this.http.post<any>(this.urls.login, data);
  }

  public signup(data: any): Observable<any> {
    return this.http.post<any>(this.urls.signup, data);
  }

  public verify(data: any): Observable<any> {
    return this.http.post<any>(this.urls.verify, data);
  }

  logout(): void {
    localStorage.clear();
  }
}
