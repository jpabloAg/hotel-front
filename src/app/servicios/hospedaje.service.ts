import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoHabitacion } from '../modelos/tipoHabitacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospedajeService {
  url:string = 'https://reservas-udea.herokuapp.com';
  constructor(private _http:HttpClient) { }

  public getHospedajes():Observable<TipoHabitacion[]>{
    return this._http.get<TipoHabitacion[]>(`${this.url}/tiposHabitaciones`);
  }

  public getHospedaje(codigo:string):Observable<TipoHabitacion>{
    return this._http.get<TipoHabitacion>(`${this.url}/tiposHabitaciones/buscar?codigo=${codigo}`);
  }

  public async getHospedaje2(codigo:string):Promise<Observable<TipoHabitacion>>{
    return await this._http.get<TipoHabitacion>(`${this.url}/tiposHabitaciones/buscar?codigo=${codigo}`);
  }
}
