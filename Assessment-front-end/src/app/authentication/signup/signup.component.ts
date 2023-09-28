import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;
  isSubmitted:boolean = false;

  constructor(
    private userservice: UserserviceService,
    private snack: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required],
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['', Validators.required]
    })
  }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  formSubmit() {

    this.isSubmitted = true;

    if(this.signUpForm.invalid){
       Object.keys(this.signUpForm.controls).forEach(field => {
        this.signUpForm.controls[field].markAsTouched({onlySelf:true})
       })
      this.snack.open("Please enter required fields" , '',{
        duration:3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return
    }
    // alert('submit');
    // if (this.user.username == '' || this.user.username == null) {
    //   this.snack.open('UserName is Required', '', {
    //     duration: 3000,
    //     verticalPosition: 'bottom',
    //     horizontalPosition: 'center',
    //   });
    //   return;
    // }

    //validate

    const payload = {
      username:this.signUpForm.controls['username'].value,
      password:this.signUpForm.controls['password'].value,
      firstname:this.signUpForm.controls['firstname'].value,
      lastname:this.signUpForm.controls['lastname'].value,
      email:this.signUpForm.controls['email'].value,
      phone:this.signUpForm.controls['phone'].value,
    }

    //addUser : userservice
    this.userservice.addUser(payload).subscribe(
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
  // this.user
}
