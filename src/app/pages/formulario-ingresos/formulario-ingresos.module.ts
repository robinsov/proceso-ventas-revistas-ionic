import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioIngresosPageRoutingModule } from './formulario-ingresos-routing.module';

import { FormularioIngresosPage } from './formulario-ingresos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioIngresosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormularioIngresosPage]
})
export class FormularioIngresosPageModule {}
