import { Component, OnInit, ViewChild } from '@angular/core';
import { AbonoService } from '../services/abono.service';
import { Abono } from '../interfaces/IAbono';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { AbonoPage } from '../pages/abono/abono.page';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { DeudaService } from '../services/deuda.service';
import { DeudaDelCliente } from '../interfaces/IDeuda';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  abonos: Abono[] = [];
  totalAbonos: number;
  textoBuscar = '';
  
  abonosPorId: boolean = false;
  nombreCliente: string;
  deudaTotalDelCliente: DeudaDelCliente;
  idCliente: string = 'no-cliente';

  constructor(private abonoSrv: AbonoService,
    private actRouter: ActivatedRoute,
    private deudaSrv: DeudaService,
    private clienteSrv: ClienteService,
  private modalCtrl: ModalController) { }
  
  ngOnInit(): void {
    this.vieneIdPorUrl();
  }

  async vieneIdPorUrl() {
    this.actRouter.params.subscribe(async({ id }) => {
      if (id) {
        this.idCliente = await id;
        this.obtenerAbonoPorIdCliente(id);
        
      } else {
        this.obtenerAbonos(true);
      }
    })
  }

  obtenerAbonoPorIdCliente(idCliente: string) {
    this.abonoSrv.obtenerAbonoPorIdCliente(idCliente).subscribe(resp => {
      this.deudaTotal(idCliente)
      this.abonosPorId = true;
      this.abonos = resp;


      this.clienteSrv.obtenerClientePorId(idCliente).subscribe( (resp:any)  => {
        this.nombreCliente = resp.nombre
      })

    })
  }

  obtenerAbonos(refresh?: boolean) {
    
    if (refresh) {
      this.abonoSrv.obtenerAbonos(refresh).subscribe((abonos: any) => {
        // console.log(abonos)
        this.abonos = abonos.abonoDB;
        this.totalAbonos = abonos.total;
      })
    } else {
      this.abonoSrv.obtenerAbonos().subscribe((abonos: any) => {
        // console.log(abonos)
        this.abonos = abonos.abonoDB;
        this.totalAbonos = abonos.total;
      })
    }

  }

  async hacerAbono(idCliente: string) {
    console.log('click')
    const modal = await this.modalCtrl.create({
      component: AbonoPage,
      componentProps: {
        idCliente
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data.accion) {
      console.log(data)
      if (data.idCliente) {
        console.log(data.idCliente)
          this.obtenerAbonoPorIdCliente(data.idCliente)
        } 
    } else {
      this.obtenerAbonos(true)
    }
  }

  deudaTotal(idCliente: string) {
    this.deudaSrv.getDeudasPorCliente(idCliente).subscribe(resp => {
      this.deudaTotalDelCliente = resp;
    })
  }

  buscar(event) {
    if (event.detail.value.length === 0) {
      this.obtenerAbonos();
      return
    }
    this.textoBuscar = event.detail.value;
    const abonosEncontrados = this.abonos.filter(a => (a.cliente['nombre'].toLowerCase().includes(this.textoBuscar.toLowerCase())) > 0)
    this.abonos = abonosEncontrados;
  }

  siguiente(event?) {

    if (this.abonosPorId) {
      this.obtenerAbonoPorIdCliente(this.idCliente)
      event.target.disabled = true
      return
    }
    this.abonoSrv.obtenerAbonos().subscribe((resp: any) => {
      console.log(resp.abonoDB)
      this.abonos.push(...resp.abonoDB);
      event.target.complete();
      if (resp.abonoDB.lengt === 0) {
        event.target.disabled = true
      }
    })
  }


}
