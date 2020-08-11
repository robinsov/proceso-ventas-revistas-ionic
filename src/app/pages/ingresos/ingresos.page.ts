import { Component, OnInit } from '@angular/core';
import { IngresosService } from 'src/app/services/ingresos.service';
import { Ingreso, RespIngresos } from '../../interfaces/IIngresos';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { FormularioEgresoPage } from '../formulario-egreso/formulario-egreso.page';
import { FormularioIngresosPageModule } from '../formulario-ingresos/formulario-ingresos.module';
import { FormularioIngresosPage } from '../formulario-ingresos/formulario-ingresos.page';
import { ConceptosService } from 'src/app/services/conceptos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {

  ingresos: Ingreso[] = []
  totalRecaudado: number;
  totalAbonos: number;

  formularioConcepto = this.formBuilder.group({
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
  })

  constructor(private ingresoSrv: IngresosService,
    private conceptosSrv: ConceptosService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private toastController:ToastController,
    public alertController: AlertController,) { }

  ngOnInit() {

    this.obtenerIngresos()

  }

  obtenerIngresos() {
    this.ingresoSrv.getIngresos().subscribe((resp:any) => {
      console.log(resp)
      this.ingresos = resp.ingresos
      this.totalAbonos = resp.totalAbonos;
      this.totalRecaudado = resp.totalRecaudado
    })
  }

  async crearIngreso(ingreso: Ingreso, concepto) {
    const modal = await this.modalCtrl.create({
      component: FormularioIngresosPage,
      componentProps: {
        ingreso,
        descripConcepto: concepto
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data.accion) {
        this.obtenerIngresos()
    }
  }

  editarIngreso(ingreso: Ingreso, concepto:string) {
    console.log(ingreso)
    this.crearIngreso(ingreso, concepto)
  }

  eliminarIngreso(ingreso: Ingreso) {
    this.ingresoSrv.deleteIngreso(ingreso._id).subscribe(resp => {
      console.log(resp)
      this.obtenerIngresos()
    })
  }


  async eliminarConfirm(ingreso: Ingreso) {

    console.log(ingreso)

    const alert = await this.alertController.create({
      header: 'Confirmar!!',
      message: '<strong>Está seguro, no podrá recuperar la informacion de nuevo</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: (e) => {
            this.eliminarIngreso(ingreso);
            this.presentToast(`Registro eliminado correctamente`)
            console.log('Ingreso eliminado');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }

  async crearConcepto() {
    let descripcion;
    let categoria;
    let resp
    await Swal.fire({
      title: 'Nuevo Concepto',
      html:
        '<input id="swal-input1" class="swal2-input" placeHolder="Descripción">' +
        `
          <select id="swal-input2" class="swal2-input">
            <option value="Egresos">Egresos</option>
            <option value="Ingresos">Ingresos</option>
          </select>
        `,
      focusConfirm: false,
      preConfirm: () => {

        descripcion = document.querySelector('#swal-input1');
        categoria = document.querySelector('#swal-input2');
        
        resp = {
          descripcion: descripcion.value,
          categoria: categoria.value
        }
        if (descripcion && categoria) {
          return resp
        } else {
          return false
        }
        
      }
    })

    if (resp) {
      this.formularioConcepto.patchValue({'descripcion': resp.descripcion})
      this.formularioConcepto.patchValue({'categoria': resp.categoria})
    
      console.log(this.formularioConcepto.value)

      this.conceptosSrv.crearConcepto(this.formularioConcepto.value).subscribe(resp => {
        console.log(resp)
      })
    } else {
      return
    }
  }

}
