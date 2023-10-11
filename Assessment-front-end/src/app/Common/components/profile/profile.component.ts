import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  image: string = '';
  EditUserForm!:FormGroup;
  displayPassword:boolean = false;

  constructor(
    private login: LoginService, 
    private router: Router,
    private formBuilder:FormBuilder
    )  {}

  ngOnInit(): void {

    this.EditUserForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|softtek\.com)$/i)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })

    // this.user = this.login.getuserDetail();
    this.login.getCurrentUser().subscribe(
      (data)=>{console.log(data);
        this.user=data;
        this.setFormValues();
      },
      (error)=>{
        alert("Error");
      }
    );
    this.image = "../../../assets/Profile Pictures/" + this.login.getuserDetail().profile;
  }

  setFormValues(){
    this.EditUserForm.controls['firstName'].setValue(this.user.firstName)
    this.EditUserForm.controls['lastName'].setValue(this.user.lastName)
    this.EditUserForm.controls['email'].setValue(this.user.email)
    this.EditUserForm.controls['phoneNumber'].setValue(this.user.phone)
    this.EditUserForm.controls['userName'].setValue(this.user.username)
    Object.keys(this.EditUserForm.controls).forEach(field => {
      this.EditUserForm.controls[field].disable();
    })
  }

  navigateToPasswordReset(): void {
    // Navigate to the password reset page with the user object as a parameter
    this.router.navigate(['/admin/password-reset', { user: JSON.stringify(this.user) }]);
  }

  checkPassword(event:any){}
  getErrorMessage(){}
  changePasswordofUser(){
    this.displayPassword = !this.displayPassword
  }
}
