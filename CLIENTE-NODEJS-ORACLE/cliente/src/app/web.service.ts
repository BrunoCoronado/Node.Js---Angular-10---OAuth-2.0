import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private protocolo: string = 'http://'
  private host: string = 'localhost:3000'
  private path_raiz: string = '/api'

  constructor(private http: HttpClient) { }

  async iniciarSesion(data){
    return this.http.post(`${this.protocolo}${this.host}${this.path_raiz}/login`, data).toPromise();
  }
}
