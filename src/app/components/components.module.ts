import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TarjetasPedidosComponent } from './tarjetas-pedidos/tarjetas-pedidos.component';




@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    TarjetasPedidosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    TarjetasPedidosComponent
  ]
})
export class ComponentsModule { }
