/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthResult, NbAuthService } from '../../services/auth.service';

@Component({
  selector: 'nb-verify-email-page',
  styleUrls: ['./verify-email.component.scss'],
  template: `
    <nb-auth-block>
     <nb-card>
          <nb-card-body>
            <div class="col-xl-4 col-lg-6 col-md-8 col-sm-12">
      <h2 class="title">Email Verify</h2>
      
        <div *ngIf="errors && errors.length > 0 && !submitted" class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="messages && messages.length > 0 && !submitted" class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

      <div class="links col-sm-12">
        <small class="form-text">
          Already have an account? <a routerLink="../login"><strong>Sign In</strong></a>
        </small>
        <small class="form-text">
          <a routerLink="../register"><strong>Sign Up</strong></a>
        </small>
      </div>
      </div>
          </nb-card-body>
        </nb-card>
    </nb-auth-block>
  `,
})
export class NbVerifyEmailComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  params ;
  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router, protected activatedRoute: ActivatedRoute) {
    this.params = this.activatedRoute.snapshot.params;
   	this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.provider = this.getConfigValue('forms.resetPassword.provider');
  }

   ngOnInit(){
   
     if(this.params.verifytoken){
       this.resetPass()
     }    
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.user.token = this.params.verifytoken;
    this.service.verifyEmail(this.provider, this.user).subscribe((result: NbAuthResult) => {
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
