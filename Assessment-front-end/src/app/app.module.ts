import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { from } from 'rxjs';
import { authInterceptorProviders } from './services/auth.interceptor';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { MatTableModule } from '@angular/material/table';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewAssessmentsComponent } from './pages/admin/view-assessments/view-assessments.component';
import { AddAssessmentComponent } from './pages/admin/add-assessment/add-assessment.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AddAdminComponent } from './pages/admin/add-admin/add-admin.component';

import {FileServicesService} from './services/file-services.service';
import { AddUserComponent } from './pages/admin/add-user/add-user.component';
import { UpdateAssessmentComponent } from './pages/admin/update-assessment/update-assessment.component';
import { ViewAssessmentQuestionsComponent } from './pages/admin/view-assessment-questions/view-assessment-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateSingleQuestionComponent } from './pages/admin/update-single-question/update-single-question.component';
import { AccessRequestComponent } from './pages/admin/access-request/access-request.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AssignTestComponent } from './pages/admin/assign-test/assign-test.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { ViewUserAssessmentsComponent } from './pages/user/view-user-assessments/view-user-assessments.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewAssessmentsComponent,
    AddAssessmentComponent,
    AddAdminComponent,
    AddUserComponent,
    UpdateAssessmentComponent,
    ViewAssessmentQuestionsComponent,
    AddQuestionComponent,
    UpdateSingleQuestionComponent,
    AccessRequestComponent,
    AssignTestComponent,
    UserWelcomeComponent,
    ViewUserAssessmentsComponent,
    UserSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  providers: [authInterceptorProviders,FileServicesService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
