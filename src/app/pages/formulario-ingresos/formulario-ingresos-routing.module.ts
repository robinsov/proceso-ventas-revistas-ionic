import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioIngresosPage } from './formulario-ingresos.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioIngresosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioIngresosPageRoutingModule {}
