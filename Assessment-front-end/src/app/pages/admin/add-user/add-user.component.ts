import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(
    private userservice: UserserviceService,
    private snack: MatSnackBar
  ) { }
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
        console.log(data.message);
        if (data.message === "Success") {
          //Success
          Swal.fire(
            data.message,
            this.user.firstName + ' is Registered as User',
            'success'
          );
          this.user = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
          };
        }else{
          Swal.fire(
            data.message,
            'Email or Phone Number already exists',
            'warning'
          );
        }
      },
      (error) => {
        //Error
        console.log(error);
        this.snack.open('Error: Check the entered email or phone number', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    );

  }
  private isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|softtek\.com)$/i.test(email); // Replace with actual validation logic
  }

  private isValidPhone(phone: string): boolean {
    phone = phone.replace(/^\+91/, '');
    this.user.phone = phone;
    return /^[6789]\d{9}$/.test(phone); // Check if it's a 10-digit number
  }
}
