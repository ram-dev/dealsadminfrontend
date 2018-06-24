import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealsComponent } from './deals.component';
import { DealsListComponent } from './deals-list/deals-list.component';
import { DealsEditComponent } from './deals-edit/deals-edit.component';
import { DealPreviewComponent } from './deals-preview/deals-preview.component';



const routes: Routes = [{
  path: '',
  component: DealsComponent,
  children: [{
    path: 'list',
    component: DealsListComponent,
  },{
    path: 'edit',
    component: DealsEditComponent,
  },{
    path: 'edit/:id',
    component: DealsEditComponent,
  },{
    path: 'preview/:id',
    component : DealPreviewComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsRoutingModule { }

export const routedComponents = [
  DealsComponent,
  DealsListComponent,
  DealsEditComponent,
  DealPreviewComponent
];
