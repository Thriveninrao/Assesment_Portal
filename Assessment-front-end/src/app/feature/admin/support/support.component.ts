import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportForm!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.supportForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      company:['', Validators.required],
      phone:['', Validators.required],
      message:['', Validators.required]
    })
  }

  onSubmit(){
    if (this.supportForm.invalid) {
      Object.keys(this.supportForm.controls).forEach(field => {
        this.supportForm.controls[field].markAsTouched({ onlySelf: true })
      })
      this.snack.open('Please enter required fields', '', {
        duration: 3000,
      });
      return;
    }else{
      this.snack.open('API Integration Pending...', '', {
        duration: 3000,
      });
    }
  }
}
