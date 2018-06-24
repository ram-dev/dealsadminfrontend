import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NbAuthService, NbAuthJWTToken } from '../../auth';

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    
  ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    var token= window.localStorage.auth_app_token;
    if (token != undefined || token != '') {
      headersConfig['Authorization'] = `Bearer `+token;
    }    
    return new Headers(headersConfig);
  }

  private setHeadersWithoutToken(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };    
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error).catch(err => {       
       return Observable.of(err);
     }
    )
  }

  getWithoutToken(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { headers: this.setHeadersWithoutToken(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }
}
