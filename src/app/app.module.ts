/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ImageUploadModule } from "angular2-image-upload";
import { NbEmailPassAuthProvider, NbAuthModule  } from './auth';
import { NB_AUTH_TOKEN_WRAPPER_TOKEN,  NB_AUTH_INTERCEPTOR_HEADER, NbAuthSimpleToken, NbAuthJWTInterceptor} from './auth';
import { TreeviewModule } from 'ngx-treeview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    MultiselectDropdownModule,
    ReactiveFormsModule,

    NgbModule.forRoot(),
    ImageUploadModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(), 
    TreeviewModule.forRoot(),   
    NbAuthModule.forRoot({
         providers: {
           email: {
             service: NbEmailPassAuthProvider,             
           },
         },
    }),
    
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }, 
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthSimpleToken },  
    { provide: HTTP_INTERCEPTORS , useClass: NbAuthJWTInterceptor ,  multi: true}, 
  ],
})
export class AppModule {
}
