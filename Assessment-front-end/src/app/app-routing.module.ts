import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewAssessmentsComponent } from './pages/admin/view-assessments/view-assessments.component';
import { AddAssessmentComponent } from './pages/admin/add-assessment/add-assessment.component';
import { AssignTestComponent } from './pages/admin/assign-test/assign-test.component';
import { AddAdminComponent } from './pages/admin/add-admin/add-admin.component';
import { AddUserComponent } from './pages/admin/add-user/add-user.component';
import { UpdateAssessmentComponent } from './pages/admin/update-assessment/update-assessment.component';
import { ViewAssessmentQuestionsComponent } from './pages/admin/view-assessment-questions/view-assessment-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateSingleQuestionComponent } from './pages/admin/update-single-question/update-single-question.component';
import { AccessRequestComponent } from './pages/admin/access-request/access-request.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { ViewUserAssessmentsComponent } from './pages/user/view-user-assessments/view-user-assessments.component';
import { UserDetailsComponent } from './pages/admin/user-details/user-details.component';
import { AdminDetailsComponent } from './pages/admin/admin-details/admin-details.component';
import { UserAssessmentDetailsComponent } from './pages/admin/user-assessment-details/user-assessment-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
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
        path: 'add-user',
        component: AddUserComponent,
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
      }
    ],
  },
  {
    path:'user',
    component:UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {
        path:'',
        component:UserWelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'view-user-assessments',
        component:ViewUserAssessmentsComponent,
      },
    ],

  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
