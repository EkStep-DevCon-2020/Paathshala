import { HttpOptions } from './httpOptions';
import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  userInfo: any;
  //  = {
  //   "osUpdatedAt": "2020-02-18T12:54:26.279Z",
  //   "code": "VIS6",
  //   "osCreatedAt": "2020-02-18T12:54:26.279Z",
  //   "name": "User2",
  //   "photo": "https://vignette.wikia.nocookie.net/jamescameronsavatar/images/5/5c/Avatar_Logo_revised.png/revision/latest?cb=20100207200600",
  //   "osid": "1-63c8bfe5-e5ca-4f3b-bb1a-46ac41f3b917"
  // };
  baseUrl = 'https://devcon.sunbirded.org/api/';
  http: HttpClient;
  httpOptions = {};
  constructor(http: HttpClient) {
    this.http = http;
  }
  private getHeader(headers?: any) {
    // tslint:disable-next-line:variable-name
    const default_headers = {
      // tslint:disable-next-line:max-line-length
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZWU4YTgxNDNiZWE0NDU4YjQxMjcyNTU5ZDBhNTczMiJ9.7m4mIUaiPwh_o9cvJuyZuGrOdkfh0Nm0E_25Cl21kxE'
    };
    return { ...default_headers, ...headers };
  }

  post(requestParam): Observable<any> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ?  this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param
    };
    return this.http.post(this.baseUrl + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: any) => {
        // if (data.responseCode !== 'OK') {
        //   return observableThrowError(data);
        // }
        return observableOf(data);
      }));
  }

  get(requestParam): Observable<any> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ?  this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param
    };
    return this.http.get(this.baseUrl + requestParam.url, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }

  put(requestParam): Observable<any> {
    return this.http.put(requestParam.url, requestParam.file, requestParam.config).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }
}