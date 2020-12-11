import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { Reserva } from '../../modelos/reserva';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router }  from '@angular/router';
@Component({
  selector: 'app-consulta-reserva',
  templateUrl: './consulta-reserva.component.html',
  styleUrls: ['./consulta-reserva.component.css']
})
export class ConsultaReservaComponent implements OnInit {
  public codigoReserva:string;
  public reserva:Reserva;
  public reservaElminada:Reserva;
  public fechaIngreso:any;
  public fechaSalida:any;
  constructor(private _reservaService:ReservaService,
              private _modalService:NgbModal, private _router:Router) { 
    this.codigoReserva = '';
  }

  ngOnInit(): void {
  }

  buscarReserva(){
  
    this._reservaService.buscarReserva(this.codigoReserva).subscribe(
      response => {
        this.reserva = response;
      }
    )
  }

  eliminarReserva(deleteModal){
    this._reservaService.cancelarReserva(this.codigoReserva).subscribe(
      response => {
        this.reservaElminada = response;
        this._router.navigate(['home']);
      }
    );
  }

  actualizarReserva(reservaUp){
    this.fechaIngreso = new Date(this.fechaIngreso);
    this.fechaSalida = new Date(this.fechaSalida);
    reservaUp.fechaIngreso = this.fechaIngreso;
    reservaUp.fechaSalida= this.fechaSalida;
    this._reservaService.actualizarReserva(reservaUp).subscribe(
      response => {
        this.reserva = response;
      }
    )

  }

  mostrarModalUpdate(updateModal){
    this._modalService.open(updateModal);
  }

  private formatearFecha(date:Date){
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
}
