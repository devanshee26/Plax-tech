import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  public url = environment.backend + 'predict';

  constructor(private http: HttpClient) {
  }

  public get(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
