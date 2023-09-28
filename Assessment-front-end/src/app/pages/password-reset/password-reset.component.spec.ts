import { ComponentFixture, TestBed} from '@angular/core/testing';
import { Component } from '@angular/core';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetComponent]
    });
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  userEmail: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showOTPField: boolean = false;
  showNewPasswordFields: boolean = false;
  showResetButton: boolean = false;

  sendOTP() {
    // Add logic to send OTP to the user's email address
    // You can implement this using a service or a REST API call
    // After OTP is sent successfully, update the UI
    this.showOTPField = true;
    this.showResetButton = true; // Show the reset button after OTP is sent
  }

  resetPassword() {
    // Add logic to verify OTP and reset the password
    // Check if newPassword and confirmPassword match
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

  }
}