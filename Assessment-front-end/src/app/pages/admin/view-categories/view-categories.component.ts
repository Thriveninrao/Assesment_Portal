import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories: any = [
    {
      categoryId: 23,
      categoryTitle: 'Programming Langauage',
      categoryDescription:
        'In this quiz, you will be tested on Core Java basics and OOPS concepts. There are some code snippets too to test your basic Java coding skills. Some of the questions have multiple answers.',
    },
  ];
  constructor(private _category: CategoryService) {}
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        //success
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }
  deleteCategory(categoryId: any) {
    
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
            Swal.fire('Success', 'Assessment Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting', 'error');
          }
        );
      }
    });
  }
}
