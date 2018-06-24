/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';
import { NbAuthService } from '../services/auth.service';
import { MENU_ITEMS } from '../../home/home-menu';

@Component({
  selector: 'nb-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
  <ngx-home-layout>    
      <nb-menu [items]="menu"></nb-menu>  
      <router-outlet></router-outlet>
    </ngx-home-layout>    
  `,
})
export class NbAuthComponent implements OnDestroy {

  subscription: any;
  menu = MENU_ITEMS;
  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService) {

    this.subscription = auth.onAuthenticationChange()
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
