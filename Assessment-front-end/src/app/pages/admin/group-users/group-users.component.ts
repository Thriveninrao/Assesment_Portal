import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent {
  groupForm!: FormGroup;
  selectedUsers: any[] = [];
  users: any[] = [];
  disabled!: boolean;
  groupName: string = '';
  testUserRoleId: any;
  filteredUsers: any[] = [];

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  userMenuItems: any[] = []; // Create an array to store menu items

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserserviceService, private _router: Router, private snack: MatSnackBar) {
    this.groupForm = this.formBuilder.group({
      groupName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['selectedUsers']) {
        this.selectedUsers = JSON.parse(params['selectedUsers']);
        if (params['users']) {
          this.users = JSON.parse(params['users']);
          // Remove selected assessments from the assessments array
          this.selectedUsers.forEach(selectedUser => {
            const index = this.users.findIndex(user => user.id === selectedUser.id);
            if (index !== -1) {
              this.users.splice(index, 1);
            }
          });
        }
      } else if (params['groupId']) {
        this.groupName = JSON.parse(params['groupName']);
        this.selectedUsers = JSON.parse(params['userList']);
        if (params['users']) {
          this.users = JSON.parse(params['users']);
          this.selectedUsers.forEach(selectedUser => {
            const index = this.users.findIndex(user => user.id === selectedUser.id);
            if (index !== -1) {
              this.users.splice(index, 1);
            }
          });
        }
        this.groupForm.get('groupName')!.setValue(this.groupName);
        console.log('Users: ', this.users);
        console.log('SelectedUsers: ', this.selectedUsers);
      } else {
        if (params['users']) {
          this.users = JSON.parse(params['users']);
          this.selectedUsers.forEach(selectedUser => {
            const index = this.users.findIndex(user => user.id === selectedUser.id);
            if (index !== -1) {
              this.users.splice(index, 1);
            }
          });
        }
      }
    });

    this.groupForm.get('groupName')!.valueChanges.subscribe((value) => {
      this.groupForm.get('groupName')!.setValidators([Validators.required]);
      this.groupForm.get('groupName')!.updateValueAndValidity();
    });

    this.userMenuItems = [...this.users];
  }

  onSubmit() {
    // This is where you handle the form submission
    if (this.groupForm.valid) {
      // Do something with the form data
      console.log('Form submitted with data:', this.groupName);

      this.groupName = this.groupForm.get('groupName')!.value;

      const selectedUserIds = this.selectedUsers.map(user => user.id);

      const dataToSend = {
        groupName: this.groupName,
        selectedUserIds: selectedUserIds
      };

      this.userService.userGroup(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          //Success
          Swal.fire('Success', data.message, 'success').then(() => {
            this._router.navigate(['/admin/view-user-groups']);
          });
        },
        (error) => {
          //Error
          console.log('error: ', error);
          this.snack.open('Error in Test assignment', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        }, () => {
          this.disabled = false;
        }
      );
    }
  }
  removeUser(index: number) {
    if (index >= 0 && index < this.selectedUsers.length) {
      const removedUser = this.selectedUsers.splice(index, 1);
      this.users.push(removedUser[0]);
      this.userMenuItems.push(removedUser[0]);
    }
  }

  openUserMenu() {
    this.userMenuItems = this.users.filter(
      (user) => !this.selectedUsers.includes(user)
    );
    this.trigger.openMenu();
  }

  addUserFromMenu(user: any) {
    this.selectedUsers.push(user);
    this.removeUserFromMenu(user);
    this.trigger.closeMenu();
  }

  goBack(){
    window.history.back();
  }

  // Method to remove assessment from assessmentMenuItems
  removeUserFromMenu(user: any) {
    const index = this.userMenuItems.indexOf(user);
    if (index !== -1) {
      this.userMenuItems.splice(index, 1);
    }
  }

}
