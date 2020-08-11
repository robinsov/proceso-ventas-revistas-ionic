import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ingresos',
    loadChildren: () => import('./pages/ingresos/ingresos.module').then( m => m.IngresosPageModule)
  },
  {
    path: 'egresos',
    loadChildren: () => import('./pages/egresos/egresos.module').then( m => m.EgresosPageModule)
  },
  {
    path: 'formulario-egreso',
    loadChildren: () => import('./pages/formulario-egreso/formulario-egreso.module').then( m => m.FormularioEgresoPageModule)
  },
  {
    path: 'formulario-ingresos',
    loadChildren: () => import('./pages/formulario-ingresos/formulario-ingresos.module').then( m => m.FormularioIngresosPageModule)
  },
  
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
