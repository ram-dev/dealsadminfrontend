import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileChangePWDComponent } from './profile-changepwd/profile-changepwd.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [{
    path: 'edit',
    component: ProfileEditComponent,
  },
  {
    path: 'changepwd',
    component: ProfileChangePWDComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }

export const routedComponents = [
  ProfileComponent,
  ProfileEditComponent,
  ProfileChangePWDComponent
];
