import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormClientePageRoutingModule } from './form-cliente-routing.module';

import { FormClientePage } from './form-cliente.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormClientePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [FormClientePage]
})
export class FormClientePageModule {}
