import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresosPageRoutingModule } from './egresos-routing.module';

import { EgresosPage } from './egresos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SumarEgresosPorConceptoPipe } from 'src/app/pipes/sumar-egresos-por-concepto.pipe';
import { FechaPersonalizadaPipe } from 'src/app/pipes/fecha-personalizada.pipe';
import { FormularioEgresoPage } from '../formulario-egreso/formulario-egreso.page';
import { FormularioEgresoPageModule } from '../formulario-egreso/formulario-egreso.module';

@NgModule({
  entryComponents: [
    FormularioEgresoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EgresosPageRoutingModule,
    ComponentsModule,
    FormularioEgresoPageModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EgresosPage,
    SumarEgresosPorConceptoPipe,
    FechaPersonalizadaPipe
  ]
})
export class EgresosPageModule {}
