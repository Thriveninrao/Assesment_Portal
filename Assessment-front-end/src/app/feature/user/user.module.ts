import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { TakeUserAssessmentQuestionsComponent } from './take-user-assessment-questions/take-user-assessment-questions.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserWelcomeComponent } from './user-welcome/user-welcome.component';
import { ViewUserAssessmentsComponent } from './view-user-assessments/view-user-assessments.component';
import { MaterialModule } from 'src/app/Common/material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserDashboardComponent,
    TakeUserAssessmentQuestionsComponent,
    UserSidebarComponent,
    UserWelcomeComponent,
    ViewUserAssessmentsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class UserModule { }
