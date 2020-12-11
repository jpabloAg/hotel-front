import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoHabitacion } from 'src/app/modelos/tipoHabitacion';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { HospedajeService } from '../../servicios/hospedaje.service';


@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {
  
  public fechaIngreso:any;
  public fechaSalida:any;
  public habitacion:any;
  public codigoHabitacion:string;
  public disponibilidad:boolean;
  constructor(  private _router:Router,
                private _route:ActivatedRoute,
                private _hospedajeService:HospedajeService,
                private _reservaService:ReservaService) {
    this.disponibilidad = true;
    
  }

  ngOnInit(): void {
    
    this._route.params.subscribe( param => {
     
      this._hospedajeService.getHospedaje(param.codigoTipoHabitacion).subscribe(
        response => {
          this.habitacion = response;
          console.log(this.habitacion);
          console.log(this.habitacion.serviciosCollection);
        }
      )
    });
  }
 
  public verificarReserva(){
    this.codigoHabitacion = this._route.snapshot.paramMap.get('codigoTipoHabitacion');
    this.fechaIngreso = this.formatearFecha(this.fechaIngreso);
    this.fechaSalida = this.formatearFecha(this.fechaSalida);
  
    //this.habitacion = await this._hospedajeService.getHospedaje2(this.codigoHabitacion);
    //console.log(this.habitacion);
    this._reservaService.verificarDisponibilidad(this.codigoHabitacion, this.fechaIngreso, this.fechaSalida).subscribe(
      response => {
        if(response == 0){
          this.disponibilidad = false;
        }else if(response > 0){
          this._router.navigate(["/reserva", response, this.fechaIngreso, this.fechaSalida]);
        }
      }
    );
  }

  private formatearFecha(date:Date){
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
}
