import { Component, ViewChild, Input, Renderer2, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { PedidosDB } from '../interfaces/IPedidos';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';
import { DeudaService } from '../services/deuda.service';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  public pedidos: PedidosDB[] = [];

  pedidosCargados: boolean = false
  mostrar: boolean = false;
  nombreCliente: string;

  buscarNombrePedido: string;
  
  constructor(private pedidoSrv: PedidoService,
              public alertController: AlertController,
              private clientesSrv: ClienteService,
              private activateRoute: ActivatedRoute) { }
  
  async ngOnInit() {


    await this.vieneIdPorUrl().then((resp:string) => {
      if (resp === 'pedidos') {
        this.getPedidos();
        
      } else {
        this.pedidosDelcliente(resp)
      }
    })

    this.pedidoSrv.nuevoPedido.subscribe(async(resp) => {
      if (await resp) {
        this.getPedidos();
      }
    })

    if (this.pedidos.length === 0) {
      this.pedidosCargados = false;
    }

  }


  vieneIdPorUrl(){
    return new Promise((resolve) => {
      this.activateRoute.params.subscribe(({ id }) => {
          if (id) {
            resolve(id)
          } else {
            resolve('pedidos')
          }
        })
    })
  }

  getPedidos() {
    this.pedidoSrv.getPedidos().subscribe(pedidosDB => {
       if (pedidosDB.length > 0) {
      this.pedidosCargados = true;
    } else {
      this.pedidosCargados = false;
         
    }
      this.pedidosCargados = true;
      this.pedidos = pedidosDB;
    });
  }

  pedidosDelcliente(idCliente: string) {
    this.pedidoSrv.getPedidosPorCliente(idCliente).subscribe((resp:any) => {
        if (resp.length > 0) {
      this.pedidosCargados = true;
    } else {
      this.pedidosCargados = false;
         
    }
      this.pedidos = resp;
      this.clientesSrv.obtenerClientePorId(idCliente).subscribe((resp:any) => {
        this.nombreCliente = resp.nombre;
      })
    })
  }


  loadData(event){
    console.log('cargando ');

    if(this.pedidos.length > 50){
      event.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }

  }

  mostrarContenido() {
    this.mostrar = !this.mostrar;
    console.log(this.mostrar)
  }

  buscar(event) {
    this.buscarNombrePedido = event.target.value;
    if (this.buscarNombrePedido.length === 0) {
      this.getPedidos()
      return
    }

    let pedidosEncontrados = this.pedidos.filter( p => p.nombreProducto.toLowerCase().includes(this.buscarNombrePedido.toLowerCase()))

    this.pedidos = pedidosEncontrados;

  }

 
  

  // toggleAccordion() {
 
     

  //   if (this.accordionExapanded) {
  //     this.renderer.setStyle(this.cardContent['el'], "max-height", "0px");
  //     this.renderer.setStyle(this.cardContent['el'], "padding", "0px 16px");

  //   } else {
  //     this.renderer.setStyle(this.cardContent['el'], "max-height", "500px");
  //     this.renderer.setStyle(this.cardContent['el'], "padding", "13px 16px");

  //   }

  //   this.accordionExapanded = !this.accordionExapanded;
  //   this.icon = (this.icon == 'arrow-forward-outline') ? 'arrow-down-outline' : 'arrow-forward-outline';

  // }

}
