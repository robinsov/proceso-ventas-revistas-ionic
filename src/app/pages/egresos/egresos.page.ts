import { Component, OnInit,  AfterViewInit} from '@angular/core';
import { EgresosService } from 'src/app/services/egresos.service';
import { Egreso } from 'src/app/interfaces/IEgresos';
import { EgresosPorConcepto, Concepto } from 'src/app/interfaces/egresosPorConcepto';
import { ConceptosService } from 'src/app/services/conceptos.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

import Swal from 'sweetalert2'
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormularioEgresoPage } from '../formulario-egreso/formulario-egreso.page';


@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.page.html',
  styleUrls: ['./egresos.page.scss'],
})
export class EgresosPage implements OnInit, AfterViewInit {

  public egresos: Egreso[] = [];
  public egresosPorConceptos: Concepto[] = [];
  public montos: any;
  public totalEgresos;

  formularioConcepto = this.formBuilder.group({
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
  })

  constructor(private egresosSrv: EgresosService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private toastController:ToastController,
    public alertController: AlertController,
    private conceptosSrv: ConceptosService) { }
  
  
  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.obtenerEgresos()
    this.obtenerEgresosConceptos();

  }

  obtenerEgresos() {
    this.egresosSrv.getEgresos().subscribe((resp:any) => {
      this.totalEgresos = resp.totalEgresos
       this.egresos = resp.egresos;
    })
  }

  obtenerEgresosConceptos() {
    this.conceptosSrv.getConceptos().subscribe((resp:any) => {
      console.log(resp.conceptos)

      this.egresosPorConceptos = [];

      resp.conceptos.forEach(element => {
        if (element.egreso.length > 0) {
          if (element.categoria === 'Egresos') {
            this.egresosPorConceptos.push(element)
          }
        }
      });
    })
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

  async crearEgreso(egreso: Egreso, concepto) {
    console.log('click')
    const modal = await this.modalCtrl.create({
      component: FormularioEgresoPage,
      componentProps: {
        egreso,
        descripConcepto: concepto
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data.accion) {
        this.obtenerEgresos()
        this.obtenerEgresosConceptos();
    }
  }


  editarEgreso(egreso: Egreso, concepto:string) {
    console.log(egreso)
    this.crearEgreso(egreso, concepto)
  }

  eliminarEgreso(egreso: Egreso) {
    console.log(egreso)
    this.egresosSrv.deleteEgreso(egreso._id).subscribe(resp => {
      console.log(resp)
      this.obtenerEgresos()
        this.obtenerEgresosConceptos();
    })
  }

  async eliminarConfirm(egreso: Egreso) {
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
            console.log('Egreso eliminado');
            this.eliminarEgreso(egreso);
            this.presentToast(`Registro eliminado correctamente`)
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


}
