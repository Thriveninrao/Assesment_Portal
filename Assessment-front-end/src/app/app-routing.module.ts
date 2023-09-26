import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Common/components/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import {  } from './services/normal.guard';
import { SignupComponent } from './authentication/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./feature/user/user.module').then(m => m.UserModule)
  },

  {
    path: 'admin',
    loadChildren: () => import('./feature/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
