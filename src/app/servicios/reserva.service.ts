import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reserva } from '../modelos/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  url:string = 'http://localhost:8080/tiposHabitaciones';
  constructor(private _http:HttpClient) { }

  public verificarDisponibilidad(codigo:string, fechaIngreso:string, fechaSalida:string):Observable<number>{
    return this._http.get<number>(`${this.url}/comprobar?tipoHab=${codigo}&fechaI=${fechaIngreso}&fechaS=${fechaSalida}`)
  }

  public registrarReservar(reserva:Reserva):Observable<Reserva>{
    let params = JSON.stringify(reserva);
    let headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<Reserva>(`${this.url}/reserva`, reserva);
  }

  public buscarReserva(codigoReserva:string):Observable<Reserva>{
    return this._http.get<Reserva>(`${this.url}/reserva?codigo=${codigoReserva}`);
  }

  public cancelarReserva(codigoReserva:string):Observable<Reserva>{
    return this._http.delete<Reserva>(`${this.url}/reserva?codigo=${codigoReserva}`);
  }

  public actualizarReserva(reserva:Reserva):Observable<Reserva>{
    return this._http.post<Reserva>(`${this.url}/reserva`, reserva);
  }
}
