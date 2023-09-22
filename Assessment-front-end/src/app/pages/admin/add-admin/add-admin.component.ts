import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit {
  disabled = false;
  inputFieldsModified = false;
  mode: any;
  loadedAdmin: any;
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
        this.admin = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          username: ''
        };
      } else if (this.mode === 'edit') {
        const adminId = queryParams['adminId'];
        const adminIdNum = parseInt(adminId, 10);
        this.loadAdminData(adminIdNum);
      }
    });
  }

  loadAdminData(adminId: number): any {
    this.userservice.getUserById(adminId).subscribe(
      (adminData: any) => {
        console.log(adminData);
        this.admin = adminData;
        this.loadedAdmin = adminData;
      },
      (error: any) => {
        console.error('Error loading user data:', error);
      }
    );
  }

  public admin = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: ''
  };

  formSubmit() {
    if (!this.isValidEmail(this.admin.email)) {
      this.snack.open('Please enter a valid email address.', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if (!this.isValidPhone(this.admin.phone)) {
      this.snack.open('Please enter a valid 10-digit phone number.', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    if (this.mode === 'add') {
      console.log("adding admin");
      //addUser : userservice
      this.disabled = true;
      this.userservice.addAdmin(this.admin).subscribe(
        (data: any) => {
          if (data.message === 'Success') {
            //Success
            Swal.fire(
              data.message,
              this.admin.firstName + ' is Registered as Admin',
              'success'
            ).then((result) => {
              this._router.navigate(['/admin/admin-details']);
            });
            this.admin = {
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
          this.snack.open('Error', '', {
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
          this.userservice.updateUser(this.admin).subscribe((data: any) => {
            console.log(data.message);
            if (data.message === 'Success') {
              //Success
              Swal.fire(
                data.message,
                'Details of ' + this.admin.firstName + ' is Updated.',
                'success'
              ).then((result) => {
                this._router.navigate(['/admin/admin-details']);
              });
              this.admin = {
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
    ); // Replace with actual validation logic
  }

  private isValidPhone(phone: string): boolean {
    phone = phone.replace(/^\+91/, '');
    this.admin.phone = phone;
    return /^[6789]\d{9}$/.test(phone); // Check if it's a 10-digit number
  }
}
