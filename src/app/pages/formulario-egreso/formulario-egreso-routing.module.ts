import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioEgresoPage } from './formulario-egreso.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioEgresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioEgresoPageRoutingModule {}
