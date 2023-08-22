import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  image: string = '';
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    // this.user = this.login.getuserDetail();
    this.login.getCurrentUser().subscribe(
      (data)=>{
        this.user=data;
      },
      (error)=>{
        alert("Error");
      }
    )
    this.image = "../../../assets/Profile Pictures/" + this.login.getuserDetail().profile;
  }
}
