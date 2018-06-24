import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AgmCoreModule } from '@agm/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { HttpModule, JsonpModule } from '@angular/http';

import { ThemeModule } from '../../@theme/theme.module';
import { DealsRoutingModule, routedComponents } from './deals-routing.module';
import { DealsListService } from '../../@core/data/deals-list.service';
import { TreeviewModule } from 'ngx-treeview';
import { ShareButtonsModule } from 'ngx-sharebuttons';


@NgModule({
  imports: [
    ThemeModule,
    DealsRoutingModule,
    Ng2SmartTableModule,
    TreeviewModule.forRoot(),
    AgmCoreModule.forRoot(),
    ShareButtonsModule.forRoot(),
  ],
  declarations: [
    routedComponents,   
  ],
  providers: [
    DealsListService,
  ],
})
export class DealsModule { }
