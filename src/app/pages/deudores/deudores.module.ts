import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeudoresPageRoutingModule } from './deudores-routing.module';

import { DeudoresPage } from './deudores.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeudoresPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DeudoresPage]
})
export class DeudoresPageModule {}
