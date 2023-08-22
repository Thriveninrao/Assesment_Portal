import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private snack: MatSnackBar, private login: LoginService,private router:Router) {}
  ngOnInit(): void {
  }

  loginData = {
    username: '',
    password: '',
  };

  formSubmit() {
    console.log('Login button click');
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required!!', '', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required!!', '', {
        duration: 3000,
      });
      return;
    }

    //Request to server to generate token.
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //Login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUserDetail(user);
          console.log(user);
          // redirect ...ADMIN:: Admin-dashboard
          // redirect ...Normal:: Normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            // admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            // normal dashboard
            // window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard'])
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('error');
        console.log(error);
        this.snack.open("Invalid Details !! Try Again",'',{
          duration:3000,
        })
      }
    );
  }
}
