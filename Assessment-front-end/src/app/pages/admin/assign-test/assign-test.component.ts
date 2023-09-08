import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-test',
  templateUrl: './assign-test.component.html',
  styleUrls: ['./assign-test.component.css']
})
export class AssignTestComponent implements OnInit {
  assessments: Assessment[] = [];
  users: User[] = [];
  testUserRoleId !: number;
  selectedUsers: any[] = [];
  selectedAssessments: any[] = [];

  assessmentSearch: string = ''; // Search input for assignments
  userSearch: string = ''; // Search input for users

  // Define filtered arrays for assignments and users
  filteredAssessments: Assessment[] = this.assessments;
  filteredUsers: User[] = this.users;

  constructor(private assessmentService: AssessmentService, private userService: UserserviceService,  private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.assessmentService.assessments().subscribe(
      (data: any) => {
        this.assessments = data.map((assessment: any) => ({
          ...assessment,
          selected: false, // Initialize it as false
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
                this.users.splice(index, 1); // Removes one element at the found index
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

  // Function to update filtered assignments based on search input
  updateFilteredAssessments() {
    this.filteredAssessments = this.assessments.filter((assessment) =>
      assessment.assessmentTitle.toLowerCase().includes(this.assessmentSearch.toLowerCase()) || assessment.category.categoryTitle.toLowerCase().includes(this.assessmentSearch.toLowerCase())
    );
  }

  // Function to update filtered users based on search input
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
  }

  public dataToSend = {
    selectedAssessments: this.selectedAssessments,
    selectedUsers: this.selectedUsers,
  };

  public handleFABClick(dataToSend: any) {
    // Add your logic here for what should happen when the FAB button is clicked
    console.log('FAB button clicked');
    // You can open a dialog, navigate to a different page, or perform any other action you need.
    console.log('Selected Users:', this.selectedUsers);
    console.log('Selected Assessments:', this.selectedAssessments);

    console.log(dataToSend)
    this.userService.assignTest(dataToSend).subscribe(
      (data: any) => {
        console.log("In promice");
        
        console.log(data);
        //Success
        Swal.fire(
          'Successfully Done'
        );
      },
      (error) => {
        //Error
        console.log('error');
        this.snack.open('User with this Username is already there please try with new one', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    );

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
