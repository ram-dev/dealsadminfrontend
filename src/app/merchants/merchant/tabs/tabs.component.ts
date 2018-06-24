import { Component } from '@angular/core';
import { GeneralComponent } from './general/general.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { ImagesComponent } from './images/images.component';
import { OutletsComponent } from './outlets/outlets.component';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-tabs',
  styleUrls: ['./tabs.component.scss'],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  id: any;
  userId : any;
  constructor() {
    this.id = sessionStorage.getItem('merchantId');
    this.userId = sessionStorage.getItem('userId');
  }

  tabs: any[] = [
    {
      title: 'General',
      route: '/merchants/merchant/tabs/general',
    },
    {
      title: 'Images',
      route: '/merchants/merchant/tabs/images',
    },
    {
      title: 'Outlets',
      route: '/merchants/merchant/tabs/outlets',
    },
    {
      title: 'Amenities',
      route: '/merchants/merchant/tabs/amenities',
    },
  ];

}
