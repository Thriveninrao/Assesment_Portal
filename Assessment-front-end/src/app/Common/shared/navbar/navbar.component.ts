import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() profileName: string = '';
  isLoggedIn = false;
  user:any = null;

  constructor(public login: LoginService, private router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getuserDetail();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getuserDetail();
      console.log(this.user)
    });
  }

  onClickLogin(){
    this.router.navigateByUrl('/login')
  }

  onClickButton(btnName:string){
    if(btnName === 'profile'){
      if(this.profileName === 'NORMAL'){
        this.router.navigate(['/user/profile'])
      }else if(this.profileName === 'ADMIN' || (this.profileName === 'SUPER-ADMIN')){
        this.router.navigate(['/admin/profile'])
      }else{
        alert('No routes found')
      }
    }else if(btnName === 'logout'){
      this.logout();
    }
  }

  public logout() {
    
    if(this.login.logout()){
      this.router.navigate(['/']);
      //window.location.reload();
    }
  }
}
