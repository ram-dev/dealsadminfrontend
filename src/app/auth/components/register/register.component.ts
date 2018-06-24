/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthResult, NbAuthService } from '../../services/auth.service';

@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class NbRegisterComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  categoryList: any[] =[
    {id: "5a290b2d539eb0b14cd91d0c", label: 'Food & Beverages'},
    {id: "5a290ba6539eb0b14cd91d1f", label: 'SPA'},   
    {id: "5a290b84539eb0b14cd91d1a", label: 'Wellness'},    
    {id: "57d900c2df896e82ac1f8548", label: 'Entertainment'},
    {id: "5a290c78539eb0b14cd91d37", label: 'Travel'},
    {id: "5a290c83539eb0b14cd91d39", label: 'E-Shopping'},
    {id: "5a290c8f539eb0b14cd91d3d", label: 'Services'}    
  ]

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.provider = this.getConfigValue('forms.register.provider');
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
