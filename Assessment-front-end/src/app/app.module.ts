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
import { UserDetailsComponent } from './pages/admin/user-details/user-details.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { ViewUserAssessmentsComponent } from './pages/user/view-user-assessments/view-user-assessments.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { AdminDetailsComponent } from './pages/admin/admin-details/admin-details.component';
import { UserAssessmentDetailsComponent } from './pages/admin/user-assessment-details/user-assessment-details.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { AssessmentTakeupComponent } from './pages/user/assessment-takeup/assessment-takeup.component';
import { PreinstructionsComponent } from './pages/user/preinstructions/preinstructions.component';
import { StartTestComponent } from './pages/start-test/start-test.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GroupUsersComponent } from './pages/admin/group-users/group-users.component';
import { GroupAssessmentsComponent } from './pages/admin/group-assessments/group-assessments.component';
import { ViewUserGroupsComponent } from './pages/admin/view-user-groups/view-user-groups.component';
import { ViewAssessmentGroupsComponent } from './pages/admin/view-assessment-groups/view-assessment-groups.component';
import { FeedbackComponent } from './pages/user/feedback/feedback.component';
import { ViewAssessmentAttendedComponent } from './pages/admin/view-assessment-attended/view-assessment-attended.component';
import { MatSortModule } from '@angular/material/sort';
import { FeedbackUpdatedComponent } from './pages/user/feedback-updated/feedback-updated.component';
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
    UserDetailsComponent,
    UserWelcomeComponent,
    ViewUserAssessmentsComponent,
    UserSidebarComponent,
    AdminDetailsComponent,
    ViewAssessmentAttendedComponent,



    UserAssessmentDetailsComponent,
      PasswordResetComponent,
      AssessmentTakeupComponent,
      PreinstructionsComponent,
      StartTestComponent,
      GroupUsersComponent,
      GroupAssessmentsComponent,
      ViewUserGroupsComponent,
      ViewAssessmentGroupsComponent,
      FeedbackComponent,
      FeedbackUpdatedComponent,
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
