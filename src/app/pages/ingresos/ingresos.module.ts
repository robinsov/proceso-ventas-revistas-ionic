import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresosPageRoutingModule } from './ingresos-routing.module';

import { IngresosPage } from './ingresos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FechaPersonalizadaPipe } from 'src/app/pipes/fecha-personalizada.pipe';
import { FormularioIngresosPage } from '../formulario-ingresos/formulario-ingresos.page';
import { FormularioIngresosPageModule } from '../formulario-ingresos/formulario-ingresos.module';

@NgModule({
  entryComponents: [
    FormularioIngresosPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormularioIngresosPageModule
  ],
  declarations: [IngresosPage, FechaPersonalizadaPipe]
})
export class IngresosPageModule {}
