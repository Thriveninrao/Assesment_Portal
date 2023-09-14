import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-user-assessments',
  templateUrl: './view-user-assessments.component.html',
  styleUrls: ['./view-user-assessments.component.css']
})
export class ViewUserAssessmentsComponent implements OnInit{
  ngOnInit(): void {
    throw new Error();
  }
  assessments = [
    {
      assessmentId: 23,
      assessmentTitle: 'Basic Java Assessment',
      assessmentDescription:
        'Core Java is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        categoryId: 23,
        categoryTitle: 'Programming',
      },
    },
    {
      assessmentId: 23,
      assessmentTitle: 'Basic Java Assessment',
      assessmentDescription:
        'Core Java is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        categoryId: 23,
        categoryTitle: 'Programming',
      },
    },
  ];
}
