import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  public ip = environment.backend + 'quiz/';
  public urls = {
    add: this.ip + 'add/question',
    get: this.ip + '/get/'
  };

  constructor(private http: HttpClient) {
  }

  public addQuestion(data: any): Observable<any> {
    return this.http.post<any>(this.urls.add, data);
  }

  public getQuestion(data: string): Observable<any> {
    return this.http.get<any>(this.urls.get + data);
  }

}
