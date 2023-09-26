import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userservice: UserserviceService,
    private snack: MatSnackBar
  ) {}
  ngOnInit(): void {
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
  // this.user
}
