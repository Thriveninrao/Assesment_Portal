import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { FileServicesService } from 'src/app/services/file-services.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { UpdateSingleQuestionComponent } from '../update-single-question/update-single-question.component';

@Component({
  selector: 'app-view-assessment-questions',
  templateUrl: './view-assessment-questions.component.html',
  styleUrls: ['./view-assessment-questions.component.scss'],
})
export class ViewAssessmentQuestionsComponent implements OnInit {
  assessmentId: any;
  assessmentTitle: any;
  questions: any;
  selectedFile: File | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _assessment: AssessmentService,
    private fileService: FileServicesService,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.assessmentId = this._route.snapshot.params['assessmentId'];
    this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];
    // console.log(this.assessmentId);
    // console.log(this.assessmentTitle);
    this.getAssessmentQuestions();
    this.updateMarksandQuestions();
  }

  getAssessmentQuestions(){
    this._question.getAssessmentQuestions(this.assessmentId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
        console.log(this.questions)
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
  }

  updateMarksandQuestions(){
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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(assessmentId: any) {
    if (this.selectedFile) {
      this.fileService.postXLSXFile(assessmentId, this.selectedFile).subscribe(
        (response) => {
          console.log('File uploaded successfully!', response);
          Swal.fire('Success', 'Successfully updated', 'success');
        },
        (error) => {
          console.error('File upload failed:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
    window.location.reload();
  }

  openQuestionDialog(){
    const dialogRef = this._dialog.open(AddQuestionComponent, {
      data: {assessmentID:this.assessmentId, assessmentTitle:this.assessmentTitle }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAssessmentQuestions()
    });
  }
  openQuestionUpdateDialog(questionId:any){
    const dialogRef = this._dialog.open(UpdateSingleQuestionComponent, {
      data: {assessmentID:this.assessmentId, assessmentTitle:this.assessmentTitle, qstId: questionId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAssessmentQuestions()
    });
  }
}
