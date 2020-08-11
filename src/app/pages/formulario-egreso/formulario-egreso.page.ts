import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PickerController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Concepto, Egreso } from 'src/app/interfaces/egresosPorConcepto';
import { ConceptosService } from 'src/app/services/conceptos.service';
import { EgresosService } from 'src/app/services/egresos.service';

@Component({
  selector: 'app-formulario-egreso',
  templateUrl: './formulario-egreso.page.html',
  styleUrls: ['./formulario-egreso.page.scss'],
})
export class FormularioEgresoPage implements OnInit {

  @Input() egreso: Egreso;
  @Input() descripConcepto: string;

  conceptos: Concepto[] = [];

  listaDeConceptos = [];
  customPickerOptions: any;

  conceptSeleted = 'Concepto';

  formularioEgreso = this.formBuilder.group({
    monto: new FormControl('', Validators.required),
    concepto: new FormControl('', Validators.required)
  })

  

  constructor(private modalctrl: ModalController,
    private toastController: ToastController,
    private conceptosSrv: ConceptosService,
    private egresSrv: EgresosService,
    private pickerCtrl: PickerController,
    private formBuilder: FormBuilder) { }
  

  ngOnInit() {
    this.getConceptos();

    this.llenarCampos();
  }

  llenarCampos() {
    if (this.egreso) {
      this.conceptSeleted = this.descripConcepto;
      this.formularioEgreso.patchValue({ 'concepto': this.egreso.concepto });
      this.formularioEgreso.patchValue({ 'monto': this.egreso.monto });
      console.log(this.formularioEgreso)
    }
  }

  async mostrarListaConceptos() {
    this.customPickerOptions = {
      buttons: [{
        text: 'Confirmar',
        handler: (e) => {
          this.conceptSeleted = e.conceptos.text
          let aux = e.conceptos.value
          this.formularioEgreso.patchValue({'concepto':aux})
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
        }]
      ,
      columns: [
        {
          name: 'conceptos',
          options: this.listaDeConceptos
        }
      ]
    }
    let picker = await this.pickerCtrl.create(this.customPickerOptions)

    picker.present();
    
  }


  getConceptos() {
    this.conceptosSrv.getConceptos().subscribe(async(resp:any) => {
      console.log(resp.conceptos)
      resp.conceptos.forEach(async element => {
          if (element.categoria === 'Egresos') {
            
            this.listaDeConceptos.push({
              text: await element.descripcion,
              value: await element._id
            })
          }
        });
    })
  }

  crearEgreso() {
    if (this.formularioEgreso.invalid) {
      return
    }

    if (!this.egreso) {
        this.egresSrv.crearEgreso(this.formularioEgreso.value).subscribe((resp:any) => {
        console.log(resp)
        this.presentToast(`Regristro creado correctamente`)
          this.modalctrl.dismiss({
          accion: true,
          idEgreso: resp.egreso._id
        });
      })
    } else {
      this.egresSrv.modificarEgreso(this.egreso._id, this.formularioEgreso.value).subscribe((resp:any) => {
        console.log(resp)
        this.presentToast(`Regristro modificado correctamente`)
        this.modalctrl.dismiss({
          accion: true
        });
      })
    }
  }

  regresar() {
    this.modalctrl.dismiss({
      accion: false
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }

}
