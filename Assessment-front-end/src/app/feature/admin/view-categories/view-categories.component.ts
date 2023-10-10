import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss'],
})
export class ViewCategoriesComponent implements OnInit {

  pageSize = 5; // Number of items to display per page
  pageIndex = 0; // Current page index
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  categoriesData:Categories[] = [];
  categories: Categories[] = [
    // {
    //   categoryId: 23,
    //   categoryTitle: 'Programming Langauage',
    //   categoryDescription:
    //     'In this quiz, you will be tested on Core Java basics and OOPS concepts. There are some code snippets too to test your basic Java coding skills. Some of the questions have multiple answers.',
    // },
  ];
  assessments = [
    {
      assessmentId: 23,
      assessmentTitle: 'Basic Java Assessment',
      assessmentDescription:
        'Core Java is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        categoryId: 23,
        categoryTitle: 'Programming',
      },
    },
    {
      assessmentId: 23,
      assessmentTitle: 'Basic Java Assessment',
      assessmentDescription:
        'Core Java is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        categoryId: 23,
        categoryTitle: 'Programming',
      },
    },
  ];
  step!: number;
  constructor(
    private _category: CategoryService,
    private _assessment: AssessmentService,
    private _dialog:MatDialog
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.getAssessments();

  }

  getCategories(){
    this._category.categories().subscribe(
      (data: any) => {
        //success
        this.categories = data;
        console.log(this.categories);
        this.categoriesData = this.categories.slice(0,5)
       
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  getAssessments(){
    this._assessment.assessments().subscribe((data: any) => {
      //success
      this.assessments = data;
      console.log(this.assessments);
    });
  }

  deleteCategory(categoryId: any) {
    this.assessments = this.assessments.filter(
      (test) => test.category.categoryId === categoryId
    );
    if (this.assessments.length == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Are you sure to delete this Category ?',
        confirmButtonText: 'Delete',
        showCancelButton: true,
      }).then((result) => {
        // delete
        // alert(result.value === true)
        if (result.value) {
          this._category.deleteCategory(categoryId).subscribe(
            (data) => {
              this.categories = this.categories.filter(
                (test: any) => test.categoryId != categoryId
              );
              Swal.fire('Success', 'Category Deleted', 'success');
              this.getCategories();
            },
            (error) => {
              Swal.fire('Error', 'Error in deleting', 'error');
            }
          );
        }
      });
    } else {
      Swal.fire(
        'error',
        'Unable to delete the Category. There are some Assessment linked to it.',
        'error'
      );
      this.ngOnInit();
    }
  }


  openDialog(name:string, rowData:any) {
    const dialogRef = this._dialog.open(AddCategoryComponent, {
      data:{headerName:name, rowData:rowData}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategories();
      this.getAssessments();
    });
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.categoriesData = this.categories.slice(startIndex, endIndex);
  }

  setStep(index: number) {
    this.step = index;
  }
}

export interface Categories {
  categoryId: number,
  categoryTitle: string,
  categoryDescription: string,
  assessmentSize: number
}
