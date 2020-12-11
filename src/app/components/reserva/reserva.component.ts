import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from 'src/app/modelos/reserva';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { Cliente } from '../../modelos/cliente';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  public codigoHabitacion:number;
  public fechaIngreso:string;
  public fechaSalida:string;
  public cliente:Cliente;
  public reserva:Reserva;
  public codigoReserva:string = '123456'
  constructor(private _route:ActivatedRoute,
              private _reservaService:ReservaService,
              private _clienteService:ClienteService,
              private _modalService:NgbModal) { 
    this.cliente = {
      nombre:'',
      apellido:'',
      email:'',
      celular:'',
      cedula:''
    };
    this.reserva = {
      codigoReserva:'',
      numeroHabitacion:0,
      fechaIngreso:'',
      fechaSalida:'',
      cedulaCliente:''
    };
  }

  ngOnInit(): void {
    this.codigoHabitacion = Number(this._route.snapshot.paramMap.get('codigoHabitacion'));
    this.fechaIngreso = this._route.snapshot.paramMap.get('fechaIngreso');
    this.fechaSalida = this._route.snapshot.paramMap.get('fechaSalida');
  }

  reservar(formReserva, reservaModal){
    
    this.reserva.numeroHabitacion = this.codigoHabitacion;
    this.reserva.fechaIngreso = new Date(this.fechaIngreso);
    this.reserva.fechaSalida = new Date(this.fechaSalida);
    this.reserva.cedulaCliente = "1";
    
    
   // this._clienteService.registrarCliente(this.cliente);
    this._reservaService.registrarReservar(this.reserva).subscribe(
      response => {
        this.codigoReserva = response.codigoReserva;
        this.fechaIngreso = ''; 
        this.fechaSalida = '';
        formReserva.reset();
        this._modalService.open(reservaModal);
      }
    )
    
  }
}
