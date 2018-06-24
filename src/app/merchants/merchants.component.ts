import { Component } from '@angular/core';

import { MENU_ITEMS } from './merchants-menu';

@Component({
  selector: 'ngx-merchants',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class MerchantsComponent {

  menu = MENU_ITEMS;
}
