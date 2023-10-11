import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Common/material/material.module';
import { FooterComponent } from './Common/components/footer/footer.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './Common/components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './services/auth.interceptor';
import { FileServicesService } from './services/file-services.service';
import { NavbarComponent } from './Common/shared/navbar/navbar.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ProfileComponent } from './Common/components/profile/profile.component';
import { SharedModule } from './Common/shared/shared.module';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PasswordResetComponent,
    ProfileComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  providers: [authInterceptorProviders, FileServicesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
