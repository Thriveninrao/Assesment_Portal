import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { ResultOfAssessment } from 'src/app/Interfaces/assessment.interface';
import Swal from 'sweetalert2';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-assessment-attended',
  templateUrl: './view-assessment-attended.component.html',
  styleUrls: ['./view-assessment-attended.component.scss'],
})

export class ViewAssessmentAttendedComponent implements OnInit, AfterViewInit {
  assessmentId: any;
  assessmentTitle: any;
  ELEMENT_DATA: ResultOfAssessment[] = [];
  displayedColumns: string[] = ['userId', 'userName', 'obtainedMarks', 'assessmentTookDate'];
  dataSource = new MatTableDataSource<ResultOfAssessment>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private __AssessmentService: AssessmentService,
    private dialogref: MatDialogRef<ViewAssessmentAttendedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    {
      //   this._route.params.subscribe(params => {
      //   const assessmentId = params['assessmentId'];
      //   const assessmentTitle = params['assessmentTitle'];
      //   this.assessmentId = assessmentId;
      //   this.assessmentTitle = assessmentTitle;
      // });
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Custom sorting for date
    this.dataSource.sortingDataAccessor = (item: ResultOfAssessment, property: string) => {
      console.log('Sorting accessor called for property:', property);
      console.log(item);
      switch (property) {
        case 'assessmentTookDate':
          return parseCustomDate(item.assessmentTookDate || '');
        default:
          return (item as any)[property];
      }
    };

  }

  ngOnInit(): void {
    this.assessmentId = this.data?.rowData?.assessmentId;
    this.assessmentTitle = this.data?.rowData?.assessmentTitle;
    this.getAttendentsResults()
  }

  getAttendentsResults(){
    this.__AssessmentService.GetAttendentsAndResults(this.assessmentId).subscribe(
      (data) => {
        this.ELEMENT_DATA = data as ResultOfAssessment[];
        this.dataSource = new MatTableDataSource<ResultOfAssessment>(this.ELEMENT_DATA);
        console.log(this.dataSource);
        if (this.ELEMENT_DATA.length === 0) {
          Swal.fire(
            'Info',
            `Nobody attended this test till now`,
            'info'
          );
          this.dialogref.close();
        }
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'error',
          `Issue in fetching Results of ${this.assessmentTitle}`,
          'error'
        );
      }
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
function parseCustomDate(dateString: string): Date {
  console.log("parsedcustomdate");
  console.log(dateString.toString());
  const [day, month, year] = dateString.split('/').map(Number);

  console.log("Day:", day);
  console.log("Month:", month);
  console.log("Year:", year);

  const parsedDate = new Date(year, month - 1, day); // Months are 0-based in JavaScript
  console.log("Parsed date:", parsedDate);
  return parsedDate;
}



