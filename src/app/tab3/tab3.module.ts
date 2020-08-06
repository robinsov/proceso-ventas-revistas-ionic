import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module'
import { ComponentsModule } from '../components/components.module';
import { AbonoPage } from '../pages/abono/abono.page';
import { AbonoPageModule } from '../pages/abono/abono.module';

@NgModule({
  entryComponents: [
    AbonoPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    ComponentsModule,
    AbonoPageModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
