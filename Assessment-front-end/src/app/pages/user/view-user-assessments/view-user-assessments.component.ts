import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user-assessments',
  templateUrl: './view-user-assessments.component.html',
  styleUrls: ['./view-user-assessments.component.css']
})

export class ViewUserAssessmentsComponent implements OnInit {

  assessments: Assessment[] = [];
  user: any =null;

  constructor(private assessmentService: AssessmentService, private login: LoginService) { }

  ngOnInit(): void {

    this.login.getCurrentUser().subscribe(
      (data)=>{console.log(data);
        this.user=data;
        this.assessmentService.userAssessments(this.user.id).subscribe(
          (assessData: any) => {
            this.assessments = assessData;
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !', 'Error Loading data', 'error');
          }
        );
      },
      (error)=>{
        alert("Error");
      }
    )
  }
}

interface Assessment {
  assessmentId: number;
  assessmentTitle: string;
  assessmentDescription: string;
  maxMarks: string;
  numberOfQuestions: string;
  active: string;
  category: {
    categoryTitle: string;
  }
}

// interface User {
//   id: number,
// }