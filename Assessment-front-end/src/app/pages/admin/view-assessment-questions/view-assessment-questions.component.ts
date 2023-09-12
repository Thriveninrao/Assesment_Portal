import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-assessment-questions',
  templateUrl: './view-assessment-questions.component.html',
  styleUrls: ['./view-assessment-questions.component.css'],
})
export class ViewAssessmentQuestionsComponent implements OnInit {
  assessmentId: any;
  assessmentTitle: any;
  questions: any;

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _assessment: AssessmentService
  ) {}

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
    // console.log(this.assessmentId);
    // console.log(this.assessmentTitle);
  }

  // delete question
  deleteQuestion(questionId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: `Are you sure to delete this question ?`,
    }).then((result) => {
      if (result.value) {
        // confirm
        this._question.deleteQuestion(questionId).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Success', 'Question Successfully Deleted', 'success');
            this.questions = this.questions.filter(
              (q: any) => q.questionId != questionId
            );
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error in Deleting Question');
          }
        );
      }
    });
  }
}
