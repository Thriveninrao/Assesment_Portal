import { Component, OnInit, ViewChild } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categories: any;
  assessments: any;
  users: User[]=[];
  noOfCategories: any;
  noOfAssessments: any;
  noOfUsers: any;
  dashboardCategory: any[]=[];
  pagedCategories: any[] = []; 
  pageSize: number = 3;

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
        this.updatePagedData();
        // this.dashboardCategory.length = 3;
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
      (data: any) => {
        this.users = data;
        const filteredUsers = this.users.filter((user: User) => user.profile === 'User.jpg');
        this.noOfUsers = filteredUsers.length;
      },
      //error
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in fetching Users', 'error');
      }
    )

  }

  updatePagedData() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedCategories = this.dashboardCategory.slice(startIndex, endIndex);
  }

  // Function to handle page changes
  onPageChange(event: any) {
    this.updatePagedData();
  }
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
}