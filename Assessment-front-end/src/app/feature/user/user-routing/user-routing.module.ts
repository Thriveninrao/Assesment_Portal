import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TakeUserAssessmentQuestionsComponent } from '../take-user-assessment-questions/take-user-assessment-questions.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { UserWelcomeComponent } from '../user-welcome/user-welcome.component';
import { ViewUserAssessmentsComponent } from '../view-user-assessments/view-user-assessments.component';
import { ProfileComponent } from 'src/app/Common/components/profile/profile.component';
import { PreinstructionsComponent } from '../preinstructions/preinstructions.component';
import { StartTestComponent } from '../start-test/start-test.component';
import { FeedbackComponent } from '../feedback/feedback.component';

const routes:Routes = [

  {
    path:'',
    component: UserDashboardComponent,
    children: [
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
      {
        path:'take-user-assessment-questions/:assessmentId/:assessmentTitle',
        component:TakeUserAssessmentQuestionsComponent,
      },
      {
        path:'pre-instructions/:assessmentId/:assessmentTitle',
        component:PreinstructionsComponent,
      },
      {
        path:'start/:assessmentId/:assessmentTitle',
        component:StartTestComponent,
      },
      {
        path:'feedback',
        component:FeedbackComponent
      }
    ]
  }

  // {
  //   path:'user',
  //   component:UserDashboardComponent,
  //   canActivate: [],
  //   children:[
  //     {
  //       path:'',
  //       component:UserWelcomeComponent,
  //     },

  //   ],

  // },
  // {
  //   path: 'user-dashboard',
  //   component: UserDashboardComponent,
  //   pathMatch: 'full',
  //   canActivate: [],
  // },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
