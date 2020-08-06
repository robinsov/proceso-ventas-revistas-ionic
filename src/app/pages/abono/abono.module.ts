import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonoPageRoutingModule } from './abono-routing.module';

import { AbonoPage } from './abono.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbonoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AbonoPage]
})
export class AbonoPageModule {}
