import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioEgresoPageRoutingModule } from './formulario-egreso-routing.module';

import { FormularioEgresoPage } from './formulario-egreso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormularioEgresoPageRoutingModule,
  ],
  declarations: [FormularioEgresoPage]
})
export class FormularioEgresoPageModule {}
