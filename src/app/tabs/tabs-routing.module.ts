import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab2/:id',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab3/:id',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'pedido',
        loadChildren: () => import('../pages/pedido/pedido.module').then( m => m.PedidoPageModule)
      },
      {
        path: 'pedido/:id',
        loadChildren: () => import('../pages/pedido/pedido.module').then( m => m.PedidoPageModule)
      },
      {
        path: 'form-cliente',
        loadChildren: () => import('../pages/form-cliente/form-cliente.module').then( m => m.FormClientePageModule)
      },
      {
        path: 'form-cliente/:id',
        loadChildren: () => import('../pages/form-cliente/form-cliente.module').then( m => m.FormClientePageModule)
      },
      {
        path: 'deudores',
        loadChildren: () => import('../pages/deudores/deudores.module').then( m => m.DeudoresPageModule)
      },
      {
        path: 'datos-cliente/:id',
        loadChildren: () => import('../pages/datos-cliente/datos-cliente.module').then( m => m.DatosClientePageModule)
      }, {
        path: 'ingresos',
        loadChildren: () => import('../pages/ingresos/ingresos.module').then( m => m.IngresosPageModule)
      },
      {
        path: 'egresos',
        loadChildren: () => import('../pages/egresos/egresos.module').then( m => m.EgresosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
