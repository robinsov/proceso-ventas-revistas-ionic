import { Component, OnInit } from '@angular/core';
import { DeudaService } from 'src/app/services/deuda.service';
import { DeudaDelCliente } from 'src/app/interfaces/IDeuda';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.page.html',
  styleUrls: ['./deudores.page.scss'],
})
export class DeudoresPage implements OnInit {

  public deudores: DeudaDelCliente[] = [];

  buscarDeudor: string
  constructor(private deudasSrv: DeudaService) { }

  ngOnInit() {
    this.getDeudores()
  }
  
  getDeudores() {
    this.deudasSrv.getDeudas().subscribe(resp => {
      console.log(resp)
      this.deudores = resp;
    })
    
  }

  buscar(event) {
    this.buscarDeudor = event.target.value;
    if (this.buscarDeudor.length === 0) {
      this.getDeudores()
      return
    }
    let clientesEncontrados = this.deudores.filter( d => d.cliente['nombre'].toLowerCase().includes(this.buscarDeudor.toLowerCase()))
    this.deudores = clientesEncontrados;
  }

}
