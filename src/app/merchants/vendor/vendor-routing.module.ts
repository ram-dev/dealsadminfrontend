import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorComponent } from './vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorViewComponent } from './vendor-view/vendor-view.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';


const routes: Routes = [{
  path: '',
  component: VendorComponent,
  children: [{
    path: 'list',
    component: VendorListComponent,
  },{
    path: 'view/:id',
    component : VendorViewComponent
  },{
    path: 'add-amount/:id',
    component : VendorAddComponent
  }  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule { }

export const routedComponents = [
  VendorComponent,
  VendorListComponent,
  VendorViewComponent,
  VendorAddComponent
];
