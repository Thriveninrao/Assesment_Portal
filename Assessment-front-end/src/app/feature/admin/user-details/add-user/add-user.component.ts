import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;

  inputFieldsModified = false;
  editUsername: boolean = false;
  disabled = false;
  mode: any;
  loadedUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private userservice: UserserviceService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private _router: Router,
    private dialogref: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|softtek\.com)$/i)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    })


    if (this.data?.rowData) {
      this.userForm.controls['firstName'].setValue(this.data?.rowData?.firstName)
      this.userForm.controls['lastName'].setValue(this.data?.rowData?.lastName)
      this.userForm.controls['email'].setValue(this.data?.rowData?.email)
      this.userForm.controls['phone'].setValue(this.data?.rowData?.phone)
    } else {
      this.userForm.controls['firstName'].setValue('')
      this.userForm.controls['lastName'].setValue('')
      this.userForm.controls['email'].setValue('')
      this.userForm.controls['phone'].setValue('')
    }

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


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  onSubmitForm() {

    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach(field => {
        this.userForm.controls[field].markAsTouched({ onlySelf: true })
      })
      this.snack.open('Please enter required fields', '', {
        duration: 3000,
      });
      return;
    }

    const payload = {
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      email: this.userForm.controls['email'].value,
      phone: this.userForm.controls['phone'].value,
      username: this.data?.rowData ? this.data?.rowData?.username : ''
    }

    if (this.data?.headerName === 'Add') {
      this.userservice.addUser(payload).subscribe((data: any) => {
        if (data.message === 'Success') {
          Swal.fire(
            data.message,
            this.user.firstName + ' is Registered as User',
            'success'
          )

          this.dialogref.close()
        } else {
          Swal.fire(
            data.message,
            'Email or Phone Number already exists',
            'warning'
          );
        }
      }, (error) => {
        this.snack.open('Error', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      })

    } else if (this.data?.headerName === 'Update') {
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
          this.userservice.updateUser(payload).subscribe((data: any) => {
            console.log(data.message);
            if (data.message === 'Success') {
              //Success
              Swal.fire(
                data.message,
                'Details of ' + this.user.firstName + ' is Updated.',
                'success'
              )
              this.dialogref.close()
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
}
