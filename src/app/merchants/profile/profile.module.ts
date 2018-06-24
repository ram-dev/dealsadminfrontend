import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfileRoutingModule, routedComponents } from './profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NB_AUTH_TOKEN_WRAPPER_TOKEN, 
  NB_AUTH_INTERCEPTOR_HEADER,
  NbAuthSimpleToken, 
  NbAuthJWTInterceptor} from '../../auth';

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule    
  ],
  declarations: [
    routedComponents,
  ],
  providers: [
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthSimpleToken }, 
  ],
})
export class ProfileModule {

}
