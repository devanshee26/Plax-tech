import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  public ip = environment.backend + 'placement/';

  constructor(private http: HttpClient) {
  }

  public get(data: string): Observable<any> {
    return this.http.get<any>(this.ip + data);
  }
}
