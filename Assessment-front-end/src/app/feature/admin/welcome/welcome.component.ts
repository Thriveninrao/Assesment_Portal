import { Component, OnInit, ViewChild } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { AdminService } from '../admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { I_Category } from '../admin.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  displayedColumns: string[] = ['categoryTitle', 'categoryDescription', 'assessmentSize'];
  dataSource!: MatTableDataSource<I_Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  categories: any;
  // assessments: any;
 // users: User[] = [];
  noOfCategories: any;
  noOfAssessments: any;
  noOfUsers: any;
  // dashboardCategory: any[] = [];
  // pagedCategories: any[] = [];
  // pageSize: number = 3;

  constructor(
    private _adminService: AdminService,
    private _assessmentService: AssessmentService, 
    private _categoryService: CategoryService, 
    private _userService: UserserviceService
  ) { }
  ngOnInit(): void {

    this.getCategoryData();
    this.getAssessmentsData();

    // this._assessmentService.assessments().subscribe(
    //   //success
    //   (data) => {
    //     this.assessments = data;
    //     console.log("assessments :: ", this.assessments);
    //     this.noOfAssessments = this.assessments.length;
    //   },
    //   //error
    //   (error) => {
    //     console.log(error);
    //     Swal.fire('Error', 'Error in fetching assessments', 'error');
    //   }
    // )

    // this._categoryService.categories().subscribe(
    //   //success
    //   (data) => {
    //     this.categories = data;
    //     console.log("categories :: ", this.categories);
    //     this.noOfCategories = this.categories.length;
    //     this.dashboardCategory = this.categories;
    //     this.updatePagedData();
    //     // this.dashboardCategory.length = 3;
    //     console.log(this.dashboardCategory.length);
    //   },
    //   //error
    //   (error) => {
    //     console.log(error);
    //     Swal.fire('Error', 'Error in fetching Categories', 'error');
    //   }
    // )

    this._userService.getUsers().subscribe(
      //success
      (data: any) => {
        // this.users = data;
        const filteredUsers = data.filter((user: User) => user.profile === 'User.jpg');
        this.noOfUsers = filteredUsers.length;
      },
      //error
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in fetching Users', 'error');
      }
    )

  }

  // updatePagedData() {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   const endIndex = startIndex + this.paginator.pageSize;
  //   this.pagedCategories = this.dashboardCategory.slice(startIndex, endIndex);
  // }

  // // Function to handle page changes
  // onPageChange(event: any) {
  //   this.updatePagedData();
  // }


  getCategoryData(){
    this._adminService.getCategories().subscribe((data:any) => {
      this.categories = data;
      this.noOfCategories = data?.length
      this.bindDataToTable(this.categories)
    })
  }

  getAssessmentsData(){
    this._adminService.getAssessments().subscribe((data:any) => {
      this.noOfAssessments = data.length;
    })
  }

  bindDataToTable(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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