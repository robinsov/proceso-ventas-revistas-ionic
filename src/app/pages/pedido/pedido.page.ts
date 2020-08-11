import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/ICliente';
import { IonToggle, ToastController } from '@ionic/angular';
import { PedidoService } from 'src/app/services/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosDB, RespPedidos } from 'src/app/interfaces/IPedidos';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  @ViewChild(IonToggle) toggle: IonToggle;

  clientes: Cliente[] = [];
  nombreCliente: string;

   formularioPedido = this.fomrsBuilder.group({
    nombreProducto: new FormControl('', [Validators.required]),
    cantidad: new FormControl('0', [Validators.required]),
    precioUnitario: new FormControl('', [Validators.required]),
    codigoProducto: new FormControl('', [Validators.required]),
    proveedor: new FormControl('', [Validators.required]),
    cliente: new FormControl('', [Validators.required]),
    entregado: new FormControl('false'),
   });

  editarPedido: Boolean = false;

  constructor(private fomrsBuilder: FormBuilder,
    private clienteSrv: ClienteService,
    private activaRoute: ActivatedRoute,
    private toastController: ToastController,
    private router: Router,
    private pedidoSrv: PedidoService) { }

  ngOnInit() {
    if (this.vieneIdPorUrl()) {
      this.getPedidoPorId(this.vieneIdPorUrl());
      this.editarPedido = true;
    } else {
      this.getClientes();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  getPedidoPorId(idPedido: string) {
    this.pedidoSrv.getPedidoPorId(idPedido).subscribe((resp:any) => {
      console.log(resp)
      this.nombreCliente = resp.cliente.nombre
      this.formularioPedido.patchValue({ 'nombreProducto': resp.nombreProducto });
      this.formularioPedido.patchValue({ 'cantidad': resp.cantidad });
      this.formularioPedido.patchValue({ 'precioUnitario': resp.precioUnitario });
      this.formularioPedido.patchValue({ 'codigoProducto': resp.codigoProducto });
      this.formularioPedido.patchValue({ 'proveedor': resp.proveedor });
      this.formularioPedido.patchValue({ 'cliente': resp.cliente });
      this.formularioPedido.patchValue({ 'entregado': resp.entregado });
    })
  }
  
  cambio(){
    this.formularioPedido.patchValue({ 'entregado': this.toggle.checked });
    console.log(this.formularioPedido.value)
  }

  vieneIdPorUrl() {
    let resp;
    this.activaRoute.params.subscribe(({ id }) => {
      (id)? resp = id: resp = false;
    })
    return resp
  }

  getClientes() {
    this.clienteSrv.obtenerClientesParaSeleccionar().subscribe(resp => {
      console.log(this.clientes);
      this.clientes = resp
    });
  }

  clienteSeleccionado(event) {
    this.formularioPedido.patchValue({ 'cliente': event.detail.value });
  }

  crearPedido() {
    // console.log(this.formularioPedido);
    if (this.editarPedido) {
      this.pedidoSrv.actualizarPedido(this.vieneIdPorUrl(), this.formularioPedido.value).subscribe(resp => {
        console.log(resp)
        this.pedidoSrv.nuevoPedido.emit(true);
        this.presentToast('Actualizó Pedido correctamente')
        this.formularioPedido.reset();
        this.router.navigateByUrl('/tabs/tab2')
      })
    } else {
      this.pedidoSrv.cargarPedido(this.formularioPedido.value).subscribe(resp => {
        console.log(resp);
        
        this.presentToast('Se guardo Pedido correctamente')
        this.formularioPedido.reset();
        this.router.navigateByUrl('/tabs/tab2')
      })
    }

  }

  sumar() {
    let cantidad = this.formularioPedido.get('cantidad').value;
    cantidad++;
    this.formularioPedido.patchValue({'cantidad': cantidad});
  }
  restar() {
    let cantidad = this.formularioPedido.get('cantidad').value;
    cantidad--;
    if (cantidad < 0) {
      return
    }
    this.formularioPedido.patchValue({'cantidad': String(cantidad)});
  }

}
