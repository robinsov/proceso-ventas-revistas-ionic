import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { PedidosDB } from 'src/app/interfaces/IPedidos';

@Component({
  selector: 'app-tarjetas-pedidos',
  templateUrl: './tarjetas-pedidos.component.html',
  styleUrls: ['./tarjetas-pedidos.component.scss'],
})
export class TarjetasPedidosComponent implements OnInit {

  @Input() pedidos: PedidosDB[]

  constructor() { }

 

  ngOnInit() {
   
  }
  

}
