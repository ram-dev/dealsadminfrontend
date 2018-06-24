import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadComponent } from './download.component';
import { SmartTableComponent } from './smart-table/smart-table.component';

const routes: Routes = [{
  path: '',
  component: DownloadComponent,
  children: [{
    path: 'smart-table',
    component: SmartTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadRoutingModule { }

export const routedComponents = [
  DownloadComponent,
  SmartTableComponent,
];
