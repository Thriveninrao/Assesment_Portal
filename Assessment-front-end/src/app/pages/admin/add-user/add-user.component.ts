import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  constructor(
    private userservice: UserserviceService,
    private snack: MatSnackBar
  ) {}
  ngOnInit(): void {
  }

  public user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
    this.userservice.addUser(this.user).subscribe(
      (data: any) => {
        console.log("entered signup");
        //Success
        Swal.fire(
          'Successfully Done',
          this.user.firstName + ' is Registered as User',
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
  private isValidEmail(email: string): boolean {
    // Implement email validation logic (e.g., regex or other checks)
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email); // Replace with actual validation logic
  }

  private isValidPhone(phone: string): boolean {
    // Implement phone validation logic (e.g., regex or other checks)
    phone = phone.replace(/^\+91/, '');
    this.user.phone=phone;
    return /^[6789]\d{9}$/.test(phone); // Check if it's a 10-digit number
  }
}
