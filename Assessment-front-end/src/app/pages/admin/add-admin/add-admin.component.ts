import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit{
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
    //addUser : userservice
    this.userservice.addAdmin(this.user).subscribe(
      (data: any) => {
        console.log("entered signup");
        //Success
        Swal.fire(
          'Successfully Done',
          this.user.firstName + ' is Registered as Admin',
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
