import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Common/components/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import {  } from './services/normal.guard';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminGuard } from './services/admin.guard';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

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
    loadChildren: () => import('./feature/user/user.module').then(m => m.UserModule),
    canActivate:[]
  },

  {
    path: 'admin',
    loadChildren: () => import('./feature/admin/admin.module').then(m => m.AdminModule),
    canActivate:[AdminGuard]
  },

  {
    path: 'password-reset',
    component: ForgotPasswordComponent
  },

  {
    path:'**',
    redirectTo:'home',
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
