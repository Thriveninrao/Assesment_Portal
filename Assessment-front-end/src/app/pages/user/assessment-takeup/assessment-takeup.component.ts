import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment-takeup',
  templateUrl: './assessment-takeup.component.html',
  styleUrls: ['./assessment-takeup.component.css']
})
export class AssessmentTakeupComponent implements OnInit {
  assessmentId: number = 1;
  assessmentTitle: any;
  questions: any;

  private currentQuestionIndex = 0;
  private score = 0;
  currentQuestion = {
    content:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:"",
    marks:0,

  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _assessment: AssessmentService,
  ) {

  }
  ngOnInit(): void {
    this.assessmentId = this._route.snapshot.params['assessmentId'];
    this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];
    this._question.getAssessmentQuestions(this.assessmentId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
        this.currentQuestion=this.questions[this.currentQuestionIndex];
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'error',
          `Issue in fetching Questions of ${this.assessmentTitle}`,
          'error'
        );
      }
    );

  }
  getCurrentQuestion() {
    // this.currentQuestion = this.questions[this.currentQuestionIndex];
    return this.questions[this.currentQuestionIndex];
  }

  getNextQuestion() {
    this.currentQuestionIndex++;
    return this.questions[this.currentQuestionIndex];
  }

  isLastQuestion() {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  checkAnswer(selectedOption: string) {
    const currentQuestion = this.getCurrentQuestion();
    if (selectedOption === currentQuestion.answer) {
      this.score += currentQuestion.marks;
    }
  }

  resetAssessment() {
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

}
