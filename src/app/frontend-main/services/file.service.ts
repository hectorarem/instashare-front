import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.baseUrl + 'file/';
  constructor(private httpClient: HttpClient) {}

  getFiles(url:string | null, filter:string | null): Observable<any> {
    const url_r = url ? url : this.baseUrl + 'file';
    const url_f = filter && url ? url_r + '&filter=' + filter : filter ? url_r + '?filter=' + filter : url_r;
    return this.httpClient.get(url_f, this.getHeaders()) as Observable<any>
  }
  createFile(data:any): Observable<any> {
    const url = this.baseUrl + 'file/';
    return this.httpClient.post(url, data, this.getHeaders()) as Observable<any>
  }
  deleteFile(id:string): Observable<any> {
    const url = this.baseUrl + 'file/' + id + '/';
    return this.httpClient.delete(url, this.getHeaders()) as Observable<any>
  }
  changeFileName(id:string, name:string, ext:string): Observable<any> {
    const url = this.baseUrl + 'change/filename/';
    return this.httpClient.post(url,{id:id, name:name, ext:ext}, this.getHeaders()) as Observable<any>
  }

  getHeaders() {
    const access = localStorage.getItem('access');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access,
      }),
    };
    return httpOptions;
  }
}
