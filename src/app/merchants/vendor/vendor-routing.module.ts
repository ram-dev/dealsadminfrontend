import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorComponent } from './vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [{
  path: '',
  component: VendorComponent,
  children: [{
    path: 'list',
    component: VendorListComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule { }

export const routedComponents = [
  VendorComponent,
  VendorListComponent,

];
