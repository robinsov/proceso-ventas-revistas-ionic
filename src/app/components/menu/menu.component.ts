import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Componente } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Componente[]

  constructor(private sidebarSrv: SidebarService) { }

  ngOnInit() {
    this.componentes = this.sidebarSrv.menu;
  }

}
