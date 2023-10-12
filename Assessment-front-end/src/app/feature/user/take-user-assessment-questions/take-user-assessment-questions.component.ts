import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { FileServicesService } from 'src/app/services/file-services.service';

@Component({
  selector: 'app-take-user-assessment-questions',
  templateUrl: './take-user-assessment-questions.component.html',
  styleUrls: ['./take-user-assessment-questions.component.scss']
})
export class TakeUserAssessmentQuestionsComponent implements OnInit {
  assessmentId: number = 1;
  assessmentTitle: any;
  questions: any;
  selectedFile: File | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _assessment: AssessmentService,
    private fileService: FileServicesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.assessmentId = this._route.snapshot.params['assessmentId'];
    this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];
    this._question.getAssessmentQuestions(this.assessmentId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'error',
          `Issue in fetching Questions of ${this.assessmentTitle}`,
          'error'
        );
      }
    );
    this._assessment
      .updateMaxMarksAndQuestionsList(this.assessmentId)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in updating quuestionsList', 'error');
        }
      );
  }

}
