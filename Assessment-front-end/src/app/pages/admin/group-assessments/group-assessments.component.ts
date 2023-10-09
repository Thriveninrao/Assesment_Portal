import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-group-assessments',
  templateUrl: './group-assessments.component.html',
  styleUrls: ['./group-assessments.component.css']
})
export class GroupAssessmentsComponent {
  groupForm!: FormGroup;
  selectedAssessments: any[] = [];
  assessments: any[] = [];
  disabled!: boolean;
  groupName:string ='';

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  assessmentMenuItems: any[] = []; // Create an array to store menu items

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private assessService: AssessmentService, private _router: Router, private snack: MatSnackBar) {
    this.groupForm = this.formBuilder.group({
      groupName: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get the selected assessments from the route or your service
    // For example, you can use route.snapshot.queryParams to retrieve the selected assessments
    this.route.queryParams.subscribe(params => {
      if (params['selectedAssessments']) {
        this.selectedAssessments = JSON.parse(params['selectedAssessments']);
        if (params['assessments']) {
          this.assessments = JSON.parse(params['assessments']);
          // Remove selected assessments from the assessments array
          this.selectedAssessments.forEach(selectedAssessment => {
            const index = this.assessments.findIndex(assessment => assessment.id === selectedAssessment.id);
            if (index !== -1) {
              this.assessments.splice(index, 1);
            }
          });
        }
      }else if (params['groupId']) {
        this.groupName = JSON.parse(params['groupName']);
        this.selectedAssessments = JSON.parse(params['assessmentList']);
        if (params['assessments']) {
          this.assessments = JSON.parse(params['assessments']);
          this.selectedAssessments.forEach(selectedAssessment => {
            const index = this.assessments.findIndex(assessment => assessment.assessmentId === selectedAssessment.assessmentId);
            if (index !== -1) {
              this.assessments.splice(index, 1);
            }
          });
        }
        this.groupForm.get('groupName')!.setValue(this.groupName);
        console.log('Users: ', this.assessments);
        console.log('SelectedAssessments: ', this.selectedAssessments);
      } else {
        if (params['assessments']) {
          this.assessments = JSON.parse(params['assessments']);
          this.selectedAssessments.forEach(selectedAssessment => {
            const index = this.assessments.findIndex(assessment => assessment.assessmentId === selectedAssessment.assessmentId);
            if (index !== -1) {
              this.assessments.splice(index, 1);
            }
          });
        }
      }

      console.log('Users: ', this.assessments);
      console.log('SelectedAssessments: ', this.selectedAssessments);

    });
    this.groupForm.get('groupName')!.valueChanges.subscribe((value) => {
      this.groupForm.get('groupName')!.setValidators([Validators.required]);
      this.groupForm.get('groupName')!.updateValueAndValidity();
    });
    this.assessmentMenuItems = [...this.assessments];
  }

  onSubmit() {
    // This is where you handle the form submission
    if (this.groupForm.valid) {
      // Do something with the form data
      console.log('Form submitted with data:', this.groupName);

      this.groupName = this.groupForm.get('groupName')!.value;

      const selectedAssessmentIds = this.selectedAssessments.map(assessment => assessment.assessmentId);

      const dataToSend = {
        groupName:this.groupName,
        selectedAssessmentIds: selectedAssessmentIds
      };

      this.assessService.assessmentGroup(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          //Success
          Swal.fire('Success', data.message, 'success').then(() => {
            this._router.navigate(['/admin/view-assessment-groups']);
          });
        },
        (error) => {
          //Error
          console.log('error: ',error);
          this.snack.open('Error in Test assignment', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        }, () => {
          this.disabled = false;
        }
      );
    }
  }
  removeAssessment(index: number) {
    if (index >= 0 && index < this.selectedAssessments.length) {
      const removedAssessment = this.selectedAssessments.splice(index, 1);
      this.assessments.push(removedAssessment[0]);
      this.assessmentMenuItems.push(removedAssessment[0]);
    }
  }

  goBack(){
    window.history.back();
  }

  openAssessmentMenu() {
    this.assessmentMenuItems = this.assessments.filter(
      (assessment) => !this.selectedAssessments.includes(assessment)
    );
    this.trigger.openMenu();
  }

  addAssessmentFromMenu(assessment: any) {
    this.selectedAssessments.push(assessment);
    this.removeAssessmentFromMenu(assessment);
    this.trigger.closeMenu();
  }

  // Method to remove assessment from assessmentMenuItems
  removeAssessmentFromMenu(assessment: any) {
    const index = this.assessmentMenuItems.indexOf(assessment);
    if (index !== -1) {
      this.assessmentMenuItems.splice(index, 1);
    }
  }

}
