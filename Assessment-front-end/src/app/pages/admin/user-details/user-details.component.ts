import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    users: User[] = []; // Initialize an empty array to hold user data
  
    constructor() {} // No need to inject a service for static data
  
    ngOnInit(): void {
      // Simulated data (static values)
      this.users = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          assessments: [
            { assessmentTitle: 'Math', score: 90 },
            { assessmentTitle: 'Science', score: 85 }
          ]
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          assessments: [
            { assessmentTitle: 'Math', score: 78 },
            { assessmentTitle: 'Science', score: 92 }
          ]
        }
      ];
    }
  }
  
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    assessments: Assessment[];
  }
  
  interface Assessment {
    assessmentTitle: string;
    score: number;
  }
