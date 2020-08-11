import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu = [
    {
        "icon": "cart",
        "name": "Pedidos",
        "redirecTo": "/tabs/tab2"
    },
    {
        "icon": "cash",
        "name": "Abonos",
        "redirecTo": "/tabs/tab3"
    },
    
    {
        "icon": "people",
        "name": "Clientes",
        "redirecTo": "/tabs/tab1"
    },
    {
        "icon": "thumbs-down",
        "name": "Deudores",
        "redirecTo": "/tabs/deudores"
    },
    {
        "icon": "trending-up-outline",
        "name": "Ingresos",
        "redirecTo": "/tabs/ingresos"
    },
    {
        "icon": "trending-down-outline",
        "name": "Egresos",
        "redirecTo": "/tabs/egresos"
    },
  ]

}
