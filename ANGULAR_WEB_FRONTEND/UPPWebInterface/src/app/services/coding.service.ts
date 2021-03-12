import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodingService {
  public ip = environment.backend + 'coding/';
  public urls = {
    get: this.ip + 'get',
    getById: this.ip + 'get/',
    add: this.ip + 'add',
    create: this.ip + 'create/submission/',
    delete: this.ip + 'delete/'
  };

  constructor(private http: HttpClient) {
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.urls.get);
  }

  public getById(id: string): Observable<any> {
    return this.http.get<any>(this.urls.getById + id);
  }

  public add(data: any): Observable<any> {
    return this.http.post<any>(this.urls.add, data);
  }

  public create(data: any): Observable<any> {
    return this.http.post<any>(this.urls.create + data._id, data);
  }

  public delete(data: any): Observable<any> {
    return this.http.delete<any>(this.urls.delete + data._id);
  }
}
