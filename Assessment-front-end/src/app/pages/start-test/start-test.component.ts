import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { TestResultService } from 'src/app/services/test-result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css'],
})
export class StartTestComponent implements OnInit {
  assessmentId: any;
  assessmentTitle: any;
  questions: any;
  assessment: any;

  correctAnswers = 0;
  attempted = 0;
  score = 0;
  isSubmit = false;
  currentQuestionIndex = 0;
  currentQuestion: any;

  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private _assessmentService: AssessmentService,
    private _login: LoginService,
    private _testResultService: TestResultService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    // this.preventBackButton();
    this.assessmentId = this._route.snapshot.params['assessmentId'];
    this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];
    this._assessmentService.getAssessment(this.assessmentId).subscribe(
      (data) => {
        console.log('ASSESSMENT DATA', data);
        this.assessment = data;
      },
      (error) => {
        console.log('ERROR', error);
        Swal.fire('error', 'Error occured while fetching assessment', 'error');
      }
    );
    this.loadQuestions();
  }

  loadQuestions() {
    this._questionService.getAssessmentQuestions(this.assessmentId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
        this.timer = this.questions.length * 60;
        this.currentQuestionIndex = 0;
        this.loadCurrentQuestion();
        this.startTimer();
        // this.questions.forEach((q: any) => {
        //   q['givenAnswer'] = '';
        // });
        // this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error Occured while loading Questions', 'error');
      }
    );
  }

  loadCurrentQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      currentQuestion['givenAnswer'] = '';
      this.currentQuestion = currentQuestion;
    } else {
      console.log('No more questions to display');
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1)
      this.currentQuestionIndex++;
    this.loadCurrentQuestion();
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.loadCurrentQuestion();
    }
  }

  isLastQuestion() {
    return !(this.currentQuestionIndex + 1 <= this.questions.length - 1)
      ? true
      : false;
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

  testResult = {
    resultId: 1,
    assessmentId: 1,
    marksObtained: 1,
    questionsAttepmted: 1,
    maxMarks: 1,
    userId: 1,
  };

  saveResult() {
    this.testResult.assessmentId = this.assessmentId;
    this.testResult.marksObtained = this.score;
    this.testResult.questionsAttepmted = this.attempted;
    this.testResult.maxMarks = this.assessment.maxMarks;
    this.testResult.userId = this._login.getuserDetail().id;

    console.log(this.testResult);

    this._testResultService.addTestResult(this.testResult).subscribe(
      (data) => {
        console.log('result', data);
        Swal.fire(
          'Submitted!',
          'Test is Submitted wnd your results wull be provided to you through mail.',
          'success'
        ).then((s) => {
          if (s.value) {
            this._router.navigate(['/user/profile']);
          }
        });
      },
      (error) => {
        console.log('Error occured', error);
        Swal.fire('Error', 'Error in submitting the test', 'error');
      }
    );
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
}
