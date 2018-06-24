import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantComponent } from './merchant.component';
import { TabsComponent} from './tabs/tabs.component';
import { GeneralComponent } from './tabs/general/general.component';
import { AmenitiesComponent } from './tabs/amenities/amenities.component';
import { ImagesComponent } from './tabs/images/images.component';
import { OutletsComponent } from './tabs/outlets/outlets.component';
import { OultelsEditComponent } from './tabs/outlets/edit/edit.component';

const routes: Routes = [{
  path: '',
  component: MerchantComponent,
  children: [{
    path: 'tabs',
    component: TabsComponent,
    children: [{
      path: '',
      redirectTo: 'general',
      pathMatch: 'full',
    }, {
      path: 'general',
      component: GeneralComponent,
    }, {
      path: 'images',
      component: ImagesComponent,
    },
    {
      path: 'outlets',
      component: OutletsComponent,
    },
    {
      path: 'outlets/delete/:id',
      component: OutletsComponent,
    },    
    {
      path: 'amenities',
      component: AmenitiesComponent,
    }],
  },
  {
    path: 'outlets/edit',
    component: OultelsEditComponent,
  },
  {
    path: 'outlets/edit/:id',
    component: OultelsEditComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantRoutingModule { }

export const routedComponents = [
  MerchantComponent,  
  TabsComponent,  
  GeneralComponent,
  AmenitiesComponent,
  OutletsComponent,
  ImagesComponent,
  OultelsEditComponent
];
