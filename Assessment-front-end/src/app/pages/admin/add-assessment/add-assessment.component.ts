import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css'],
})
export class AddAssessmentComponent implements OnInit {
  categories: any = [];
  category = {
    categoryId: '',
    categoryTitle: '',
    categoryDescription: '',
  };
  assessmentData = {
    assessmentId: 23,
    assessmentTitle: '',
    assessmentDescription: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: { categoryId: '' },
  };
  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _assessmentService: AssessmentService
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

    // call server
    this._assessmentService.addAssessment(this.assessmentData).subscribe(
      //success
      (data) => {
        Swal.fire('Success', 'Assessment is Added', 'success');
        this.assessmentData = {
          assessmentId: 23,
          assessmentTitle: '',
          assessmentDescription: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: { categoryId: '' },
        };
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'error while adding assessment', 'error');
      }
    );
  }
}
