import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosClientePageRoutingModule } from './datos-cliente-routing.module';

import { DatosClientePage } from './datos-cliente.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosClientePageRoutingModule,
    ComponentsModule
  ],
  declarations: [DatosClientePage]
})
export class DatosClientePageModule {}
