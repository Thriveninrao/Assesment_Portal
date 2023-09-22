import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  inputFieldsModified = false;
  editUsername: boolean = false;
  disabled = false;
  mode: any;
  loadedUser: any;
  constructor(
    private userservice: UserserviceService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.mode = queryParams['mode'];
      if (this.mode === 'add') {
        // Initialize user object for adding a new user
        this.user = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          username: ''
        };
      } else if (this.mode === 'edit') {
        const userId = queryParams['userId'];
        const usetIdNum = parseInt(userId, 10);
        this.loadUserData(usetIdNum);
      }
    });
  }

  loadUserData(userId: number): void {
    this.userservice.getUserById(userId).subscribe(
      (userData: any) => {
        console.log(userData);
        this.user = userData;
        this.loadedUser = userData;
      },
      (error: any) => {
        console.error('Error loading user data:', error);
      }
    );
  }

  public user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: ''
  };

  formSubmit() {
    if (!this.isValidEmail(this.user.email)) {
      this.snack.open('Please enter a valid email address.', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if (!this.isValidPhone(this.user.phone)) {
      this.snack.open('Please enter a valid 10-digit phone number.', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    //addUser : userservice
    if (this.mode === 'add') {
      console.log("adding user");
      this.disabled = true;
      this.userservice.addUser(this.user).subscribe(
        (data: any) => {
          console.log(data.message);
          if (data.message === 'Success') {
            //Success
            Swal.fire(
              data.message,
              this.user.firstName + ' is Registered as User',
              'success'
            ).then((result) => {
              this._router.navigate(['/admin/user-details']);
            });
            this.user = {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              username: ''
            };
          } else {
            Swal.fire(
              data.message,
              'Email or Phone Number already exists',
              'warning'
            );
          }
        },
        (error) => {
          //Error
          console.log(error);
          this.snack.open('Error: Check the entered email or phone number', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        }, () => {
          this.disabled = false;
        }
      );
    } else if (this.mode === 'edit') {
      Swal.fire({
        title: 'Confirm',
        text: 'Are you certain about the updated details?',
        icon: 'question',
        confirmButtonText: 'Yes',
        confirmButtonColor: 'green',
        cancelButtonText: 'No',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          console.log("updating user");
          this.disabled = true;
          if (this.editUsername === false) {
            this.user.username = this.loadedUser.username;
          }

          this.userservice.updateUser(this.user).subscribe((data: any) => {
            console.log(data.message);
            if (data.message === 'Success') {
              //Success
              Swal.fire(
                data.message,
                'Details of ' + this.user.firstName + ' is Updated.',
                'success'
              ).then((result) => {
                this._router.navigate(['/admin/user-details']);
              });
              this.user = {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                username: ''
              };
            } else {
              Swal.fire(
                data.message,
                'Email or Phone Number already exists',
                'warning'
              );
            }
          },
            (error) => {
              //Error
              console.log(error);
              this.snack.open('Error: Check the entered email or phone number', '', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
              });
            }, () => {
              this.disabled = false;
            });
        }
      });
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|softtek\.com)$/i.test(
      email
    );
  }

  private isValidPhone(phone: string): boolean {
    phone = phone.replace(/^\+91/, '');
    this.user.phone = phone;
    return /^[6789]\d{9}$/.test(phone);
  }
}
