import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup
  hidePassword: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private snack: MatSnackBar, 
    private login: LoginService, 
    private user: UserserviceService, 
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginData: any = {
    username: '',
    password: '',
  };

  newPasswordData: any = {
    username: '',
    email: '',
  }; // Define your new password request form data structure here
  showNewPasswordForm: boolean = false;

  onSubmit() {
    if(this.loginForm.invalid){
      Object.keys(this.loginForm.controls).forEach(field => {
        this.loginForm.controls[field].markAsTouched({onlySelf:true})
       })
      this.snack.open('Username and Password is required!!', '', {
        duration: 3000,
      });
      return;
    }
    // console.log('Login button click');
    // this.newPasswordData.username = this.loginData.username;
    // if (
    //   this.loginData.username.trim() == '' ||
    //   this.loginData.username == null
    // ) {
    //   this.snack.open('Username is required!!', '', {
    //     duration: 3000,
    //   });
    //   return;
    // }
    // if (
    //   this.loginData.password.trim() == '' ||
    //   this.loginData.password == null
    // ) {
    //   this.snack.open('Password is required!!', '', {
    //     duration: 3000,
    //   });
    //   return;
    // }

    const payload = {
      username : this.loginForm.controls['username'].value,
      password : this.loginForm.controls['password'].value
    }

    //Request to server to generate token.
    this.login.generateToken(payload).subscribe(
      (data: any) => {
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUserDetail(user);
          // redirect ...ADMIN:: Admin-dashboard
          // redirect ...Normal:: Normal-dashboard
          if (this.login.getUserRole() === 'ADMIN' || this.login.getUserRole() === 'SUPER-ADMIN') {
            // admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['/admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            // normal dashboard
            // window.location.href = '/user-dashboard';
            this.router.navigate(['/user'])
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log(error.status);
        const errorMessage = error.error;
        if (error.status == 400) {
          if(errorMessage == 'You have already logged in'){
            this.snack.open(errorMessage, '', {
              duration: 1500
            }).afterDismissed().subscribe(() => {
              Swal.fire(
                'Requested for a New Password',
                'You will receive a new password through email if your request is approved',
                'warning'
              );
            });
          } else {
            this.snack.open(errorMessage, '', {
              duration: 2000
            });
          }
        } else{
          this.snack.open('There was some error, Please try again', '', {
            duration: 2000
          });
        }
      }
    );
  }

  // onRequestNewPasswordClick() {
  //   this.newPasswordData.username = this.loginData.username;
  //   this.showNewPasswordForm = true;
  // }

  // requestNewPassword() {
  //   console.log('Request button click');

  //   // Call your service method that returns an observable
  //   this.user.getEmailByUserName('admin.admin').subscribe(
  //     (data) => {
  //       // Handle the data received from the observable here
  //       console.log('Received data:', data);
  //     },
  //     (error) => {
  //       // Handle errors here
  //       console.error('An error occurred:', error);
  //     }
  //   );

  //   console.log(this.user.getEmailByUserName("admin.admin"));
  // }
}
