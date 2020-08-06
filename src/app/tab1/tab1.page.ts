import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../interfaces/ICliente';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { DeudaService } from '../services/deuda.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  
  clientes: Cliente[] = [];
  loading: any;
  buscarCliente: string;

  constructor(private clienteSrv: ClienteService
  ) { }
  

  ngOnInit(): void {
    this.getClientes();

    this.clienteSrv.clienteCreado.subscribe((resp) => {
      if (resp) {
        this.getClientes();
      }
    })
  }

  getClientes() {
    this.clienteSrv.obtenerClientesParaSeleccionar().subscribe((clientes) => {
      this.clientes = clientes
    })
  }

  ngOnDestroy(): void {
    this.clienteSrv.clienteCreado.unsubscribe();
  }

  buscar(event) {
    this.buscarCliente = event.target.value;
    if (this.buscarCliente.length === 0) {
      this.getClientes()
      return
    }
    let clientesEncontrados = this.clientes.filter( c => c.nombre.toLowerCase().includes(this.buscarCliente.toLowerCase()))
    this.clientes = clientesEncontrados;
  }


}
