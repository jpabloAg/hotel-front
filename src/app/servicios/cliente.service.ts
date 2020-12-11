import { Injectable } from '@angular/core';
import { Cliente } from '../modelos/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url:string = 'http://localhost:8080/tiposHabitaciones/cliente';
  constructor(private _http:HttpClient) { }

  public registrarCliente(cliente:Cliente):Observable<Cliente>{
    let params = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('content-type', 'application/json');
    console.log(cliente);
    return this._http.post<Cliente>(this.url, cliente);
  }
}
