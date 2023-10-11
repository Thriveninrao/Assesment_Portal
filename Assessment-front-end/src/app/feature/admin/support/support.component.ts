import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportForm!:FormGroup

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.supportForm = new FormGroup({
      name:new FormControl(''),
      email:new FormControl(''),
      company:new FormControl(''),
      phone:new FormControl(''),
      message:new FormControl('')
    })
  }
}
