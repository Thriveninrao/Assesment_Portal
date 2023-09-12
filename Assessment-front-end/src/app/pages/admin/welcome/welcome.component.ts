import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  categories: any;
  assessments: any;
  users: any;
  noOfCategories: any;
  noOfAssessments: any;
  noOfUsers: any;
  dashboardCategory: any;

  constructor(private _assessmentService: AssessmentService, private _categoryService: CategoryService, private _userService: UserserviceService) { }
  ngOnInit(): void {
    this._assessmentService.assessments().subscribe(
      //success
      (data) => {
        this.assessments = data;
        console.log("assessments :: ", this.assessments);
        this.noOfAssessments = this.assessments.length;
      },
      //error
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in fetching assessments', 'error');
      }
    )

    this._categoryService.categories().subscribe(
      //success
      (data) => {
        this.categories = data;
        console.log("categories :: ", this.categories);
        this.noOfCategories = this.categories.length;
        this.dashboardCategory = this.categories;
        this.dashboardCategory.length = 3;
        console.log(this.dashboardCategory.length);
      },
      //error
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in fetching Categories', 'error');
      }
    )

    this._userService.getUsers().subscribe(
      //success
      (data) => {
        this.users = data;
        this.noOfUsers = this.users.length;
      },
      //error
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in fetching Users', 'error');
      }
    )


  }
}