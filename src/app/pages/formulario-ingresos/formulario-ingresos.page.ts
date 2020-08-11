import { Component, OnInit, Input } from '@angular/core';
import { IngresosService } from 'src/app/services/ingresos.service';
import { ModalController, ToastController, PickerController } from '@ionic/angular';
import { ConceptosService } from 'src/app/services/conceptos.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Ingreso } from 'src/app/interfaces/IIngresos';
import { Concepto } from 'src/app/interfaces/egresosPorConcepto';

@Component({
  selector: 'app-formulario-ingresos',
  templateUrl: './formulario-ingresos.page.html',
  styleUrls: ['./formulario-ingresos.page.scss'],
})
export class FormularioIngresosPage implements OnInit {

  @Input() ingreso: Ingreso;
  @Input() descripConcepto: string;

  conceptos: Concepto[] = [];

  listaDeConceptos = [];
  customPickerOptions: any;

  conceptSeleted = 'Concepto';

  formularioIngreso = this.formBuilder.group({
    monto: new FormControl('', Validators.required),
    concepto: new FormControl('', Validators.required)
  })

  

  constructor(private modalctrl: ModalController,
    private toastController: ToastController,
    private conceptosSrv: ConceptosService,
    private ingresSrv: IngresosService,
    private pickerCtrl: PickerController,
    private formBuilder: FormBuilder) { }
  

  ngOnInit() {
    this.getConceptos();

    this.llenarCampos();
  }

  llenarCampos() {
    if (this.ingreso) {
      this.conceptSeleted = this.descripConcepto;
      this.formularioIngreso.patchValue({ 'concepto': this.ingreso.concepto });
      this.formularioIngreso.patchValue({ 'monto': this.ingreso.monto });
      console.log(this.formularioIngreso)
    }
  }

  async mostrarListaConceptos() {
    this.customPickerOptions = {
      buttons: [{
        text: 'Confirmar',
        handler: (e) => {
          this.conceptSeleted = e.conceptos.text
          let aux = e.conceptos.value
          this.formularioIngreso.patchValue({'concepto':aux})
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
        if (element.categoria === 'Ingresos') {
          
          this.listaDeConceptos.push({
            text: await element.descripcion,
            value: await element._id
          })
        }
      });
    })
  }

  crearIngreso() {
    if (this.formularioIngreso.invalid) {
      return
    }

    if (!this.ingreso) {
        this.ingresSrv.crearIngreso(this.formularioIngreso.value).subscribe((resp:any) => {
        console.log(resp)
        this.presentToast(`Regristro creado correctamente`)
          this.modalctrl.dismiss({
          accion: true,
          idIngreso: resp.ingreso._id
        });
      })
    } else {
      this.ingresSrv.modificarIngreso(this.ingreso._id, this.formularioIngreso.value).subscribe((resp:any) => {
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

