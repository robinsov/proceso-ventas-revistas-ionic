import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AbonoService } from 'src/app/services/abono.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/ICliente';
import { Abono } from 'src/app/interfaces/IAbono';

@Component({
  selector: 'app-abono',
  templateUrl: './abono.page.html',
  styleUrls: ['./abono.page.scss'],
})
export class AbonoPage implements OnInit {

  @Input() idCliente: string; 

  nombreCliente: string;

  clientes: Cliente[] = [];
  
  formularioAbono = this.formbuilder.group({
    monto: new FormControl('', [Validators.required]),
    cliente: new FormControl(''),
   });


  constructor(private modalctrl: ModalController,
    private formbuilder: FormBuilder,
    private abonoSrv: AbonoService,
    public toastController: ToastController,
    private clienteSrv: ClienteService) { }

  ngOnInit() {
    
    if(this.idCliente !== 'no-cliente'){
      this.getCliente();
      this.formularioAbono.patchValue({ 'cliente': this.idCliente });
    } else {
      this.getClientes();
    }

  }

  clienteSeleccionado(event) {
    this.formularioAbono.patchValue({ 'cliente': event.detail.value });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  getCliente() {
    this.clienteSrv.obtenerClientePorId(this.idCliente).subscribe((cliente:any) => {
      this.nombreCliente = cliente.nombre
    })
  }

  getClientes() {
    this.clienteSrv.obtenerClientesParaSeleccionar().subscribe((clientes:any) => {
      this.clientes = clientes
    })
  }

  crearAbono() {
    if (this.formularioAbono.invalid) {
      return
    }
    this.abonoSrv.hacerAbono(this.formularioAbono.value).subscribe((resp:any) => {
      console.log(resp)
      this.presentToast(`Se generó un abono de $${this.formularioAbono.value.monto} Pesos`)
      this.modalctrl.dismiss({
        accion: true,
        idCliente: resp.abono.cliente
      });
    })
  }
  
  regresar() {
    this.modalctrl.dismiss({
      accion: false
    });
  }
}
