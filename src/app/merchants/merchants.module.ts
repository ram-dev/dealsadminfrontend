import { NgModule } from '@angular/core';

import { MerchantsComponent } from './merchants.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { AuthGuard } from '.././_guards';
import { TreeviewModule } from 'ngx-treeview';

const MERCHANTS_COMPONENTS = [
  MerchantsComponent,
];

@NgModule({
  imports: [
    MerchantsRoutingModule,
    ThemeModule,
    DashboardModule,
    TreeviewModule.forRoot()
  ],
  declarations: [
    MERCHANTS_COMPONENTS,
  ],
  providers:[
    AuthGuard,
  ]
})
export class MerchantsModule {
}
