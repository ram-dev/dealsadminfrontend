import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
  NbVerifyEmailComponent,
} from './auth';

const routes: Routes = [
  { path: 'admin-merchants', loadChildren: 'app/merchants/merchants.module#MerchantsModule' },
  {
    path: 'auth-admin',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password/:resetpasswordtoken',
        component: NbResetPasswordComponent,
      },
      {
        path: 'email-verify/:verifytoken',
        component: NbVerifyEmailComponent,
      },
    ],
  },
 
  { path: '', redirectTo: 'auth-admin/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth-admin/login' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
