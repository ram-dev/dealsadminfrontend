import { NgModule } from '@angular/core';

import { AngularEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { DealSummaryComponent } from './dealsummary/dealsummary.component';
import { DealSummarychartsPieComponent } from './dealsummary/dealsummary-chart/dealsummary-chart.component';
import { DownloadGraphComponent } from './downloadgraph/downloadgraph.component';
import { DownloadGraphChartComponent } from './downloadgraph/downloadgraph-chart/downloadgraph-chart.component';



@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,    
    DealSummaryComponent,
    DownloadGraphComponent,
    DownloadGraphChartComponent,
    DealSummarychartsPieComponent,
  ],
})
export class DashboardModule { }
