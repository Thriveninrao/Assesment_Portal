import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-single-question',
  templateUrl: './update-single-question.component.html',
  styleUrls: ['./update-single-question.component.scss'],
})
export class UpdateSingleQuestionComponent implements OnInit {
  assessmentId: any;
  assessmentTitle: any;
  questionId: any;
  question: any = {
    questionId:0,
    assessment: {
      assessmentId: 1,
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    image: '',
    marks: 1,
  };
  questionModel: any = {
    questionId:0,
    assessment: {
      assessmentId: 1,
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    marks: 1,
  };
  constructor(
    private _route: ActivatedRoute,
    private _questions: QuestionService,
    private _snack: MatSnackBar,
    private _assessment: AssessmentService,
    private dialogref: MatDialogRef<UpdateSingleQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    // this.assessmentId = this._route.snapshot.params['assessmentId'];
    // this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];
    // this.questionId = this._route.snapshot.params['questionId'];
     this.assessmentId = this.data.assessmentId;
    this.assessmentTitle = this.data.assessmentTitle;
    this.questionId = this.data.qstId;
    console.log(this.questionId);
    this.question.assessment['assessmentId'] = this.assessmentId;
    this._questions.getSingleQuestion(this.questionId).subscribe(
      (data) => {
        this.question = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('error', 'Error in fetching Question', 'error');
      }
    );
  }

  UpdateFormSubmit() {
    // console.log('form submit from add question :: ',this.question);
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open('Question Required !!', '', {
        duration: 3000,
      });
    } else if (
      this.question.option1.trim() == '' ||
      this.question.option1 == null
    ) {
      this._snack.open('Option1 Required !!', '', {
        duration: 3000,
      });
    } else if (
      this.question.option2.trim() == '' ||
      this.question.option2 == null
    ) {
      this._snack.open('Option2 Required !!', '', {
        duration: 3000,
      });
    } else if (
      this.question.option3.trim() == '' ||
      this.question.option3 == null
    ) {
      this._snack.open('Option3 Required !!', '', {
        duration: 3000,
      });
    } else if (
      this.question.option4.trim() == '' ||
      this.question.option4 == null
    ) {
      this._snack.open('Option4 Required !!', '', {
        duration: 3000,
      });
    } else if (
      this.question.answer.trim() == '' ||
      this.question.answer == null
    ) {
      this._snack.open('Answer Required !!', '', {
        duration: 3000,
      });
    } else if (this.question.marks == 0 || this.question.marks == null) {
      this._snack.open('Answer Required !!', '', {
        duration: 3000,
      });
    } else {
      this.questionModel.questionId=this.question.questionId;
      this.questionModel.assessment.assessmentId=this.assessmentId;
      this.questionModel.content=this.question.content;
      this.questionModel.option1=this.question.option1;
      this.questionModel.option2=this.question.option2;
      this.questionModel.option3=this.question.option3;
      this.questionModel.option4=this.question.option4;
      this.questionModel.answer=this.question.answer;
      this.questionModel.marks=this.question.marks;

      this._questions.addQuestion(this.questionModel).subscribe(
        (data: any) => {
          console.log('question added :: ', data);
          Swal.fire(
            'Success',
            `Question Updated Successfully to ${this.assessmentTitle}`,
            'success'
          );
        },
        (error) => {
          console.log('Error', error);
          Swal.fire(
            'error',
            `Error updating question to ${this.assessmentTitle}`,
            'error'
          );
        }
      );
      this.question = {
        assessment: {
          assessmentId: 1,
        },
        content: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        image: '',
        answer: '',
        marks: 1,
      };
    }
  }
}
