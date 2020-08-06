import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/ICliente';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.page.html',
  styleUrls: ['./datos-cliente.page.scss'],
})
export class DatosClientePage implements OnInit {


  cliente: Cliente = {};

  constructor(private actRoute: ActivatedRoute,
  private clienteSrv: ClienteService) { }

  ngOnInit() {
    this.vieneIdPorUrl();
  }

  vieneIdPorUrl() {
    this.actRoute.params.subscribe(({ id }) => {
      this.getClientePorId(id);
    })
  }


  getClientePorId(idCliente) {
    this.clienteSrv.obtenerClientePorId(idCliente).subscribe((resp:any) => {
      console.log(resp)
      this.cliente = resp
    })
  }

}
