import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.scss'],
})
export class AddAssessmentComponent implements OnInit {
  categories: any = [];
  category = {
    categoryId: '',
    categoryTitle: '',
    categoryDescription: '',
  };
  showMaxMarksField: boolean = false;
  assessmentData = {
    assessmentId: 23,
    assessmentTitle: '',
    assessmentDescription: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: { categoryId: '' },
    user: {
      id: 10,
    },
  };
  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _assessmentService: AssessmentService,
    private _router: Router,
    private _login: LoginService,
    private _dialog: MatDialogRef<AddAssessmentComponent>
  ) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (
        // success
        data: any
      ) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'error in loading data from server', 'error');
      }
    );
  }

  addAssessment() {
    if (
      this.assessmentData.assessmentTitle.trim() == '' ||
      this.assessmentData.assessmentTitle === null
    ) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    // we can provide multiple Validations for all the Fields.
    this.assessmentData.user.id = this._login.getuserDetail().id;
    this.assessmentData.maxMarks='0';
    this.assessmentData.numberOfQuestions='0';
    // call server
    this._assessmentService.addAssessment(this.assessmentData).subscribe(
      //success
      (data) => {
        Swal.fire('Success', 'Assessment is Added', 'success').then(
          (result) => {
            this._router.navigate(['/admin/view-assessments']);
          }
        );
        this._dialog.close();
        this.assessmentData = {
          assessmentId: 23,
          assessmentTitle: '',
          assessmentDescription: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: { categoryId: '' },
          user: {
            id: 0,
          },
        };
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'error while adding assessment', 'error');
      }
    );
  }
}
