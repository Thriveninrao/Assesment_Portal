import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AccessRequestComponent } from './access-request/access-request.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddAssessmentComponent } from './add-assessment/add-assessment.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AssignTestComponent } from './assign-test/assign-test.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpdateAssessmentComponent } from './update-assessment/update-assessment.component';
import { UpdateSingleQuestionComponent } from './update-single-question/update-single-question.component';
import { UserAssessmentDetailsComponent } from './user-assessment-details/user-assessment-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ViewAssessmentQuestionsComponent } from './view-assessment-questions/view-assessment-questions.component';
import { ViewAssessmentsComponent } from './view-assessments/view-assessments.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from 'src/app/Common/material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccessRequestComponent,
    AddAdminComponent,
    AddAssessmentComponent,
    AddCategoryComponent,
    AddQuestionComponent,
    AddUserComponent,
    AdminDashboardComponent,
    AdminDetailsComponent,
    AssignTestComponent,
    SidebarComponent,
    UpdateAssessmentComponent,
    UpdateSingleQuestionComponent,
    UserAssessmentDetailsComponent,
    UserDetailsComponent,
    ViewAssessmentQuestionsComponent,
    ViewAssessmentsComponent,
    ViewCategoriesComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AdminModule { }
