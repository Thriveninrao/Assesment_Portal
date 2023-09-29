import { Component, ViewChild, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  step: number = 1;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatchError: boolean = false;
  otp: string = '';
  timer: number = 60;
  resendButtonVisible: boolean = false;
  timerInterval: any;
  user: any = null;
  userEmail: string = '';
  otpValidation: string = '';
  userEnteredOTP: string = '';
  disabled: boolean = false;
  successMessage: string | null = null;
  resetDisabled: boolean = false;

  constructor(
    private userservice: UserserviceService,
    private snack: MatSnackBar,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    // Capture the user data from the ActivatedRoute snapshot
    this.route.params.subscribe((params) => {
      if (params && params['user']) {
        this.user = JSON.parse(params['user']);
      }
    });
  }

  sendOTP(newStep: number): void {
    if (this.userEmail === this.user.email) {
      console.log(this.userEmail);
      console.log("this.user", this.user);
      this.disabled = true;
      this.step = newStep;

      this.userservice.sendOTP(this.user.username).subscribe((data: any) => {
        console.log(data);
        this.otpValidation = data.message;
        console.log(this.otpValidation);

      },
        (error) => {
          console.log('error', error);
        });
    } else {
      // Email does not match, display an error message to the user
      console.log('Email does not match');
      // You can display an error message to the user using MatSnackBar or another method
      // Example with MatSnackBar:
      this.snack.open('Email does not match. Please enter the correct email address.', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    this.timer = 60; // Set the initial timer value
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.timerInterval); // Clear the timer interval when it reaches 0
        this.resendButtonVisible = true; // Show the Resend OTP button
      }
    }, 1000);
  }

  resendOTP() {
    this.resendButtonVisible = false;
    this.userservice.sendOTP(this.user.username).subscribe((data: any) => {
      console.log(data);
      this.otpValidation = data.message;
      console.log(this.otpValidation);
    },
      (error) => {
        console.log('error', error);
      });
    this.timer = 60; // Set the initial timer value
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.timerInterval); // Clear the timer interval when it reaches 0
        this.resendButtonVisible = true; // Show the Resend OTP button
      }
    }, 1000);
  }

  verifyOTP(newStep: number): void {
    if (this.userEnteredOTP.length == 0) {
      this.snack.open('Enter the OTP to continue.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else {

      if (this.otpValidation == this.userEnteredOTP) {
        this.step = newStep;
        console.log(this.userEnteredOTP);

      }
      else {

        console.log('OTP did not match');

        this.snack.open('OTP did not match. Please enter the correct OTP.', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    }
  }


  ngOnInit(): void {
  }



  formSubmit() {
    // alert('submit');
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('UserName is Required', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    //validate

    //addUser : userservice
    this.userservice.addUser(this.user).subscribe(
      (data: any) => {
        console.log("entered signup");
        //Success
        Swal.fire(
          'Successfully Done',
          this.user.username + ' is Registered as User',
          'success'
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

  resetPassword() {
    // Define a regular expression pattern for password complexity
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{10,}$/;
    if (this.newPassword.length != 0) {
      // Check if the new password and confirm password match
      if (this.newPassword === this.confirmPassword) {
        // Check if the new password meets the complexity criteria
        console.log("pass validate :: ", !passwordPattern.test(this.confirmPassword));

        if (passwordPattern.test(this.confirmPassword)) {
          // Password complexity is met, proceed with the password reset
          this.user.password = this.confirmPassword;
          console.log("HI password is ok");
          this.resetDisabled=true;
          this.userservice.resetPassword(this.user).subscribe(
            (data: any) => {
              console.log(data);
              // Add any additional logic for handling the password reset success

              // Display a success message to the user
              this.successMessage = 'Password reset successfully done';

              if (data.message === 'Success') {
                //Success
                Swal.fire(
                  data.message,
                  'Password Reset Successful',
                  'success'
                ).then((result) => {
                  this._router.navigate(['/admin/profile']);
                });

                this.newPassword = '';
                this.confirmPassword = '';
              }else if(data.message == 'Error in mail Service'){
                Swal.fire(
                  data.message,
                  'Password Reset Successful, But Mail could not be sent.',
                  'warning'
                ).then((result) => {
                  this._router.navigate(['/admin/profile']);
                });
              }else{
                Swal.fire(
                  data.message,
                  'Password Reset Failed',
                  'error'
                );
                this.resetDisabled=false;
              }
            },
            (error) => {
              console.log(error);
              // Handle password reset error
            }
          );
        } else {
          // Password complexity is not met, display an error message
          this.snack.open('Password did not met the requirement, Try another one.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'warning-snackbar'

          });
        }

      } else {
        // Passwords don't match, display an error message
        this.snack.open('Passwords do not match.', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }


    } else {
      // Passwords don't match, display an error message
      this.snack.open('Enter the Password.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }


  }

  isPasswordComplex(): boolean {
    // Define a regular expression pattern for password complexity
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{10,}$/;
    return !passwordPattern.test(this.newPassword);
  }
}

