import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {
  assessmentId: any;
  assessmentTitle: any;
  questions: any;

  correctAnswers = 0;
  attempted = 0;
  score = 0;
  isSubmit = false;
  currentQuestion: any;

  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _questionService: QuestionService
  ) {}
  ngOnInit(): void {
    // this.preventBackButton();
    this.assessmentId = this._route.snapshot.params['assessmentId'];
    this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];
    console.log(this.assessmentId);
    console.log(this.assessmentTitle);
    this.loadQuestions();
  }

  loadQuestions() {
    this._questionService.getAssessmentQuestions(this.assessmentId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error Occured while loading Questions', 'error');
      }
    );
  }

  submitTest() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((e) => {
      if (e.value) {
        this.evalTest();
      }
    });
  }

  startTimer() {
    let t: any = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalTest();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer - minutes * 60;
    return `${minutes} min : ${seconds} sec`;
  }

  evalTest() {
    this.isSubmit = true;
    this.questions.forEach((q: any) => {
      if (q.givenAnswer === q.answer) {
        this.correctAnswers++;
        this.score += q.marks;
      }
      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
    console.log('Correct Answers :: ', this.correctAnswers);
    console.log('Total Marks :: ', this.score);
    console.log('attemped :: ', this.attempted);
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
} {

}
