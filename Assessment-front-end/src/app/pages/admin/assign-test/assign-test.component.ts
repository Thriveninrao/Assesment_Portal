import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-test',
  templateUrl: './assign-test.component.html',
  styleUrls: ['./assign-test.component.css']
})
export class AssignTestComponent implements OnInit {
  disabled = false;
  assessments: Assessment[] = [];
  users: User[] = [];
  testUserRoleId !: number;
  selectedUsers: any[] = [];
  selectedAssessments: any[] = [];
  onlyAssessmentsSelected: boolean = false;
  onlyUsersSelected: boolean = false;


  assessmentSearch: string = '';
  userSearch: string = '';

  filteredAssessments: Assessment[] = this.assessments;
  filteredUsers: User[] = this.users;

  constructor(private assessmentService: AssessmentService, private userService: UserserviceService,  private snack: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.assessmentService.assessments().subscribe(
      (data: any) => {
        this.assessments = data.map((assessment: any) => ({
          ...assessment,
          selected: false,
        }));
        this.filteredAssessments = [...this.assessments];
        console.log(this.assessments);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error Loading data', 'error');
      }
    );

    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data.map((user: any) => ({
          ...user,
          selected: false,
        }));

        this.users.forEach((user) => {
          this.userService.getRoleId(user.username).subscribe((data: any) => {
            this.testUserRoleId = data;
            if (this.testUserRoleId === 44) {
              const index = this.users.indexOf(user);
              if (index !== -1) {
                this.users.splice(index, 1); 
              }
            }
            this.filteredUsers = [...this.users]
          });
        });
        console.log(this.users);
      },
      (error) => {
        console.log(error)
        Swal.fire('Error !', 'Error Loading data', 'error');
      });
  }

  updateFilteredAssessments() {
    this.filteredAssessments = this.assessments.filter((assessment) =>
      assessment.assessmentTitle.toLowerCase().includes(this.assessmentSearch.toLowerCase()) || assessment.category.categoryTitle.toLowerCase().includes(this.assessmentSearch.toLowerCase())
    );
  }

  updateFilteredUsers() {
    console.log(this.userSearch)
    console.log(this.filteredUsers)
    this.filteredUsers = this.users.filter((user) =>
      user.firstName.toLowerCase().includes(this.userSearch.toLowerCase()) || user.lastName.toLowerCase().includes(this.userSearch.toLowerCase()) || user.username.toLowerCase().includes(this.userSearch.toLowerCase())
    );
  }

  toggleAssessmentSelection(assessment: any) {
    if (assessment.selected) {
      this.selectedAssessments.push(assessment);
    } else {
      const index = this.selectedAssessments.findIndex((a) => a.id === assessment.id);
      if (index !== -1) {
        this.selectedAssessments.splice(index, 1);
      }
    }
    this.onlyAssessmentsSelected = this.selectedAssessments.length > 0 && this.selectedUsers.length === 0;
    this.onlyUsersSelected = this.selectedUsers.length > 0 && this.selectedAssessments.length === 0;
  }

  toggleUserSelection(user: any) {
    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      const index = this.selectedUsers.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
    this.onlyUsersSelected = this.selectedUsers.length > 0 && this.selectedAssessments.length === 0;
    this.onlyAssessmentsSelected = this.selectedAssessments.length > 0 && this.selectedUsers.length === 0;
  }

  public handleFABClick() {

    if (this.selectedUsers.length === 0) {
      console.log('Please select at least one user');
      this.snack.open('Please select at least one user', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return; 
    }

    if (this.selectedAssessments.length === 0) {
      console.log('Please select at least one assessment.');
      this.snack.open('Please select at least one assessment', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return; 
    }

    const dataToSend = {
      selectedAssessments: this.selectedAssessments,
      selectedUsers: this.selectedUsers,
    };

    this.disabled = true;
    this.userService.assignTest(dataToSend).subscribe(
      (data: any) => {
        console.log(data);
        //Success
          Swal.fire('Success', data.message, 'success').then(() => {
            this._router.navigate(['/admin/user-details']);
          });;
      },
      (error) => {
        //Error
        console.log('error');
        this.snack.open('Error in Test assignment', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      },() => {
        this.disabled = false;
      }
    );

  }
  groupAssessments(){
    console.log("in method");
    console.log("Selected Assessments",this.selectedAssessments);
    
    const queryParams = {
      selectedAssessments: JSON.stringify(this.selectedAssessments),
      assessments: JSON.stringify(this.assessments)
    };

    this._router.navigate(['/admin/group-assessments'], { queryParams });
  }

  groupUsers(){
    console.log("in method");
    console.log("Selected Users",this.selectedUsers);
    
    const queryParams = {
      selectedUsers: JSON.stringify(this.selectedUsers),
      users: JSON.stringify(this.users)
    };

    this._router.navigate(['/admin/group-users'], { queryParams });
  }

}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  selected: boolean;
}

interface Assessment {
  assessmentId: number;
  assessmentTitle: string;
  category: {
    categoryTitle: string;
  };
  selected: boolean;
}
