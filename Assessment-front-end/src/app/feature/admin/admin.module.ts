import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AccessRequestComponent } from './access-request/access-request.component';
import { AddAdminComponent } from './admin-details/add-admin/add-admin.component';
import { AddAssessmentComponent } from './view-assessments/add-assessment/add-assessment.component';
import { AddCategoryComponent } from './view-categories/add-category/add-category.component';
import { AddQuestionComponent } from './view-assessments/add-question/add-question.component';
import { AddUserComponent } from './user-details/add-user/add-user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AssignTestComponent } from './assign-test/assign-test.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpdateAssessmentComponent } from './view-assessments/update-assessment/update-assessment.component';
import { UpdateSingleQuestionComponent } from './view-assessments/update-single-question/update-single-question.component';
import { UserAssessmentDetailsComponent } from './user-assessment-details/user-assessment-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ViewAssessmentQuestionsComponent } from './view-assessments/view-assessment-questions/view-assessment-questions.component';
import { ViewAssessmentsComponent } from './view-assessments/view-assessments.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from 'src/app/Common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Common/shared/shared.module';
import { ViewUserGroupsComponent } from './view-user-groups/view-user-groups.component';
import { ViewAssessmentGroupsComponent } from './view-assessment-groups/view-assessment-groups.component';
import { GroupAssessmentsComponent } from './view-assessment-groups/group-assessments/group-assessments.component';
import { GroupUsersComponent } from './view-user-groups/group-users/group-users.component';



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
    WelcomeComponent,
    ViewUserGroupsComponent,
    ViewAssessmentGroupsComponent,
    GroupAssessmentsComponent,
    GroupUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
