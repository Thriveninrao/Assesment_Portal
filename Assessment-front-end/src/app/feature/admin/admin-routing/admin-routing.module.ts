import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminGuard } from 'src/app/services/admin.guard';
import { AccessRequestComponent } from '../access-request/access-request.component';
import { AddAdminComponent } from '../admin-details/add-admin/add-admin.component';
import { AddAssessmentComponent } from '../view-assessments/add-assessment/add-assessment.component';
import { AddCategoryComponent } from '../view-categories/add-category/add-category.component';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { AddUserComponent } from '../user-details/add-user/add-user.component';
import { AdminDetailsComponent } from '../admin-details/admin-details.component';
import { AssignTestComponent } from '../assign-test/assign-test.component';
import { UpdateAssessmentComponent } from '../update-assessment/update-assessment.component';
import { UpdateSingleQuestionComponent } from '../update-single-question/update-single-question.component';
import { UserAssessmentDetailsComponent } from '../user-assessment-details/user-assessment-details.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ViewAssessmentQuestionsComponent } from '../view-assessment-questions/view-assessment-questions.component';
import { ViewAssessmentsComponent } from '../view-assessments/view-assessments.component';
import { ViewCategoriesComponent } from '../view-categories/view-categories.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ProfileComponent } from 'src/app/Common/components/profile/profile.component';
import { PasswordResetComponent } from 'src/app/authentication/password-reset/password-reset.component';
import { ViewUserGroupsComponent } from 'src/app/feature/admin/view-user-groups/view-user-groups.component';

const routes:Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent,
      },
      {
        path: 'user-details',
        component: UserDetailsComponent,
      },
      {
        path: 'admin-details',
        component: AdminDetailsComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'view-assessments',
        component: ViewAssessmentsComponent,
      },
      {
        path: 'add-assessment',
        component: AddAssessmentComponent,
      },
      {
        path: 'assign-test',
        component: AssignTestComponent,
      },
      {
        path: 'add-user/:mode',
        component: AddUserComponent,
      },{
        path: 'add-user/edit/:userId',
        component: AddUserComponent,
        data: { mode: 'edit' } 
      },{
        path: 'add-admin/:mode',
        component: AddAdminComponent,
      },{
        path: 'add-admin/edit/:adminId',
        component: AddAdminComponent,
        data: { mode: 'edit' } 
      },
      {
        path: 'add-admin',
        component: AddAdminComponent,
      },
      {
        path: 'update-assessment/:assessmentId',
        component: UpdateAssessmentComponent,
      },
      {
        path: 'view-assessment-questions/:assessmentId/:assessmentTitle',
        component: ViewAssessmentQuestionsComponent,
      },
      {
        path: 'add-question/:assessmentId/:assessmentTitle',
        component: AddQuestionComponent,
      },
      {
        path: 'update-single-question/:assessmentId/:assessmentTitle/:questionId',
        component: UpdateSingleQuestionComponent,
      },
      {
        path: 'access-request',
        component: AccessRequestComponent,
      },
      {
        path: 'user-assessment-details',
        component: UserAssessmentDetailsComponent,
      },
      {
        path: 'view-user-groups',
        component: ViewUserGroupsComponent
      }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
