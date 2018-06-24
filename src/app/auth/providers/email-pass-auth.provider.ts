/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';

import { NgEmailPassAuthProviderConfig } from './email-pass-auth.options';
import { NbAuthResult } from '../services/auth.service';
import { NbAbstractAuthProvider } from './abstract-auth.provider';
import { getDeepFromObject } from '../helpers';

/**
 * The most common authentication provider.
 * The following options are available (with default values):
 *
 *
 *
 * @example
 *
 * Default settings object:
 * ```
 * {
 *  baseEndpoint: '',
 *  login: {
 *    alwaysFail: false,
 *    rememberMe: true,
 *    endpoint: '/api/auth/login',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Login/Email combination is not correct, please try again.'],
 *    defaultMessages: ['You have been successfully logged in.'],
 *  },
 *  register: {
 *    alwaysFail: false,
 *    rememberMe: true,
 *    endpoint: '/api/auth/register',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully registered.'],
 *  },
 *  logout: {
 *    alwaysFail: false,
 *    endpoint: '/api/auth/logout',
 *    method: 'delete',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully logged out.'],
 *  },
 *  requestPass: {
 *    endpoint: '/api/auth/request-pass',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Reset password instructions have been sent to your email.'],
 *  },
 *  resetPass: {
 *    endpoint: '/api/auth/reset-pass',
 *    method: 'put',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    resetPasswordTokenKey: 'reset_password_token',
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Your password has been successfully changed.'],
 *  },
 *  token: {
 *    key: 'data.token',
 *    getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
 *      this.getConfigValue('token.key')),
 *  },
 *  errors: {
 *    key: 'data.errors',
 *    getter: (module: string, res: HttpErrorResponse) => getDeepFromObject(res.error,
 *      this.getConfigValue('errors.key'),
 *      this.getConfigValue(`${module}.defaultErrors`)),
 *  },
 *  messages: {
 *    key: 'data.messages',
 *    getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
 *      this.getConfigValue('messages.key'),
 *      this.getConfigValue(`${module}.defaultMessages`)),
 *  },
 *}
 * ```
 */
@Injectable()
export class NbEmailPassAuthProvider extends NbAbstractAuthProvider {

  protected defaultConfig: NgEmailPassAuthProviderConfig = {
    baseEndpoint: environment.apiUrl,
    login: {
      alwaysFail: false,
      rememberMe: true,
      endpoint: 'adminlogin',
      method: 'post',
      redirect: {
        success: '/admin-merchants',
        failure: '/auth-admin/login',
      },
      defaultErrors: ['Login/Email combination is not correct, please try again.'],
      defaultMessages: ['You have been successfully logged in.'],
    },
    register: {
      alwaysFail: false,
      rememberMe: true,
      endpoint: 'register',
      method: 'post',
      redirect: {
        success: '/auth-admin/register',
        failure: '/auth-admin/register',
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['You have been successfully registered. Please verify the mail.'],
    },
    logout: {
      alwaysFail: false,
      endpoint: 'logout',
      method: 'post',
      redirect: {
        success: '/auth-admin/login',
        failure: '/auth-admin/logout',
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['You have been successfully logged out.'],
    },
    requestPass: {
      endpoint: 'forgot',
      method: 'post',
      redirect: {
        success: '/auth-admin/request-password',
        failure: '/auth-admin/request-password',
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['Reset password instructions have been sent to your email.'],
    },
    resetPass: {
      endpoint: 'reset',
      method: 'post',
      redirect: {
        success: '/auth-admin/reset-password/',
        failure: '/auth-admin/reset-password/',
      },
      resetPasswordTokenKey: 'reset_password_token',
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['Your password has been successfully changed.'],
    },
    verifyEmail: {
      endpoint: 'verifyemail',
      method: 'get',
      redirect: {
        success: '/auth-admin/email-verify/',
        failure: '/auth-admin/email-verify/',
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['Your email verification has been successfully verified.'],
    },
    token: {
      key: 'data.token',
      getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
        this.getConfigValue('token.key')),
    },
    errors: {
      key: 'data.errors',
      getter: (module: string, res: HttpErrorResponse) => getDeepFromObject(res.error,
        this.getConfigValue('errors.key'),
        this.getConfigValue(`${module}.defaultErrors`)),
    },
    messages: {
      key: 'data.messages',
      getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
        this.getConfigValue('messages.key'),
        this.getConfigValue(`${module}.defaultMessages`)),
    },
  };

  constructor(protected http: HttpClient, private route: ActivatedRoute) {
    super();
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const method = this.getConfigValue('login.method');
    const url = this.getActionEndpoint('login');
    return this.http.request(method, url, { body: data, observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('login.alwaysFail')) {
          throw this.createFailResponse(data);
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('login.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('login', res),
          this.getConfigValue('token.getter')('login', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('login', res);
		  errors.push(res.error.error);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('login.redirect.failure'),
            errors,
          ));
      });
  }

  register(data?: any): Observable<NbAuthResult> {
    const method = this.getConfigValue('register.method');
    const url = this.getActionEndpoint('register');
    return this.http.request(method, url, { body: data, observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('register.alwaysFail')) {
          throw this.createFailResponse(data);
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('register.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('register', res),
          this.getConfigValue('token.getter')('register', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('register', res);
          errors.push(res.error.error);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('register.redirect.failure'),
            errors,
          ));
      });
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    const method = this.getConfigValue('requestPass.method');
    const url = this.getActionEndpoint('requestPass');
    return this.http.request(method, url, { body: data, observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('requestPass.alwaysFail')) {
          throw this.createFailResponse();
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('requestPass.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('requestPass', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('requestPass', res);          
          errors.push(res.error.error);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('requestPass.redirect.failure'),
            errors,
          ));
      });
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
   /* const tokenKey = this.getConfigValue('resetPass.resetPasswordTokenKey');
    data[tokenKey] = this.route.snapshot.queryParams[tokenKey];*/
    this.config.resetPass.redirect.failure += data.token;
    this.config.resetPass.redirect.success += data.token;
    this.config.resetPass.resetPasswordTokenKey = data.token;
    const tokenKey = data.token;
    const method = this.getConfigValue('resetPass.method');
    const url = this.getActionEndpoint('resetPass') +'/'+ tokenKey;
    
    return this.http.request(method, url, { body: data, observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('resetPass.alwaysFail')) {
          throw this.createFailResponse();
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('resetPass.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('resetPass', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('resetPass', res);
          errors.push(res.error.error);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('resetPass.redirect.failure'),
            errors,
          ));
      });
  }

  verifyEmail(data: any = {}): Observable<NbAuthResult> {
    this.config.verifyEmail.redirect.failure += data.token;
    this.config.verifyEmail.redirect.success += data.token;
    this.config.verifyEmail.resetPasswordTokenKey = data.token;
    const tokenKey = data.token;
    const method = this.getConfigValue('verifyEmail.method');
    const url = this.getActionEndpoint('verifyEmail') +'/'+ tokenKey;
    
    return this.http.request(method, url, { body: data, observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('verifyEmail.alwaysFail')) {
          throw this.createFailResponse();
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('verifyEmail.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('verifyEmail', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('verifyEmail', res);
          errors.push(res.error.error);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('verifyEmail.redirect.failure'),
            errors,
          ));
      });
  }
  
  logout(data: any = {}): Observable<NbAuthResult> {
    const tokenKey = this.getConfigValue('token.key');   
    data[tokenKey] = this.route.snapshot.queryParams[tokenKey];
    const method = this.getConfigValue('logout.method');
    const url = this.getActionEndpoint('logout');

    return Observable.of({})
      .switchMap((res: any) => {
        if (!url) {
          return Observable.of(res);
        }
        return this.http.request(method, url, { observe: 'response' });
      })
      .map((res) => {
        if (this.getConfigValue('logout.alwaysFail')) {
          throw this.createFailResponse();
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('logout.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('logout', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('logout', res);
          errors.push(res.error.error);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('logout.redirect.failure'),
            errors,
          ));
      });
  }

  protected getActionEndpoint(action: string): string {
    const actionEndpoint: string = this.getConfigValue(`${action}.endpoint`);
    const baseEndpoint: string = this.getConfigValue('baseEndpoint');
    return baseEndpoint + actionEndpoint;
  }
}
