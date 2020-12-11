import { Component, OnInit } from '@angular/core';
import { TipoHabitacion } from 'src/app/modelos/tipoHabitacion';
import { HospedajeService } from '../../servicios/hospedaje.service';


@Component({
  selector: 'app-hospedaje',
  templateUrl: './hospedaje.component.html',
  styleUrls: ['./hospedaje.component.css']
})
export class HospedajeComponent implements OnInit {

  public tipoHabitaciones: TipoHabitacion[];
  constructor(private _hospedajeService: HospedajeService) {
    
  
    
  }

  ngOnInit(): void {
    this._hospedajeService.getHospedajes().subscribe(
      response => {
        this.tipoHabitaciones = response;
        console.log(this.tipoHabitaciones);
      }
    )
  }

}
