import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  public ip = `${environment.backend}captcha/`;

  constructor(private http: HttpClient) {
  }

  sendToken(token: string): Observable<any> {
    return this.http.post<any>(this.ip + 'validate', {
      token
    });
  }
}
