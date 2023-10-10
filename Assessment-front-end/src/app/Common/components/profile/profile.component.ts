import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  image: string = '';

  constructor(private login: LoginService, private router: Router)  {}

  ngOnInit(): void {
    // this.user = this.login.getuserDetail();
    this.login.getCurrentUser().subscribe(
      (data)=>{console.log(data);
        this.user=data;
      },
      (error)=>{
        alert("Error");
      }
    );
    this.image = "../../../assets/Profile Pictures/" + this.login.getuserDetail().profile;
  }

  navigateToPasswordReset(): void {
    // Navigate to the password reset page with the user object as a parameter
    this.router.navigate(['/admin/password-reset', { user: JSON.stringify(this.user) }]);
  }
}
