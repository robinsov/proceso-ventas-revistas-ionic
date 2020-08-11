import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.page.html',
  styleUrls: ['./form-cliente.page.scss'],
})
export class FormClientePage implements OnInit {

  

  formularioCliente = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
  })

  idCliente: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private actiRouter: ActivatedRoute,
    private clienteSrv: ClienteService) { }

  ngOnInit() {
    this.vieneIdPorUrl();
  }

  vieneIdPorUrl() {
    this.actiRouter.params.subscribe(({ id }) => {
      this.idCliente = id;

      this.clienteSrv.obtenerClientePorId(id).subscribe((resp:any) => {
        console.log(resp)
        this.formularioCliente.patchValue({nombre: resp.nombre})
        this.formularioCliente.patchValue({email: resp.email })
        this.formularioCliente.patchValue({direccion: resp.direccion})
        this.formularioCliente.patchValue({telefono: resp.telefono})
      })

    })
  }

  crearCliente(){
    // console.log(this.formularioCliente.value)

    if (!this.idCliente) {
      this.clienteSrv.crearCliente(this.formularioCliente.value).subscribe((resp:any) => {
        // console.log(resp)
        this.formularioCliente.reset();
        this.router.navigateByUrl('/tabs/tab1');
        this.presentToast(`${resp.cliente.nombre} creado correctamente`)
      }) 
    } else {
      this.clienteSrv.actualizarCliente(this.idCliente, this.formularioCliente.value).subscribe((resp:any) => {
        this.presentToast(`${resp.ClienteActualizado.nombre} modificado correctamente`)
        this.formularioCliente.reset();
        this.router.navigateByUrl('/tabs/tab1');
      })
    }

  }

  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  

}
