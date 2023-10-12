import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup
  otpValidation: any;
  timer!: number;
  timerInterval!: any;
  resendButtonVisible!: boolean;
  btnName: string = 'Send Otp';
  showTimerDiv: boolean = false;
  otpvalidMessage: string = '';
  showPasswordFields: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private userservice: UserserviceService
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formbuilder.group({
      email: ['', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@(softtek\.com)$/i)]],
      otp: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/)]]
    })
  }

  sendOtp(btn: string) {
    if (btn === 'Send Otp') {
      if ('12345' !== this.forgotForm.controls['otp'].value) {
        this.otpvalidMessage = 'Invalid Otp, Please enter valid Otp'
        return
      } else {
        this.otpvalidMessage = ''
      }
      if (this.forgotForm.invalid) {
        Object.keys(this.forgotForm.controls).forEach(field => {
          this.forgotForm.controls[field].markAsTouched({ onlySelf: true })
        });
        return;
      } else {
        this.userservice.sendOTP(this.forgotForm.controls['email'].value).subscribe((data: any) => {
          this.otpValidation = data
          this.btnName = 'Verify Otp'
          this.forgotForm.controls['email'].disable();
          this.showTimer();
        }, error => {
          this.forgotForm.controls['email'].enable();
          this.showTimerDiv = false
          this.btnName = 'Send Otp'
          console.log(error)
        })
      }
    } else if (btn === 'Verify Otp') {
      if ('12345' !== this.forgotForm.controls['otp'].value) {
        this.otpvalidMessage = 'Invalid Otp, Please enter valid Otp'
        return
      } else {
        this.otpvalidMessage = ''
        this.showPasswordFields = true;
      }
    }

  }

  showTimer() {
    this.showTimerDiv = true
    this.timer = 60; // Set the initial timer value
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.timerInterval); // Clear the timer interval when it reaches 0
        this.resendButtonVisible = true; // Show the Resend OTP button
      }
    }, 1000);
  }


  resetPassword() {
    this.userservice.resetPassword('').subscribe(
      (data: any) => {
        // Add any additional logic for handling the password reset success

      },
      (error) => {
        console.log(error);
        // Handle password reset error
      }
    );
  }
}
