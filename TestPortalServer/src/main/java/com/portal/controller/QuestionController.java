package com.portal.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.model.assessment.Assessment;
import com.portal.model.assessment.Question;
import com.portal.service.QuestionServiceInterface;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {
	@Autowired
	private QuestionServiceInterface questionService;

	@PostMapping("/addQuestion")
	public ResponseEntity<?> addQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}

	@GetMapping("/fetchQuestionById/{questionId}")
	public Question getQuestion(@PathVariable("questionId") Long questionId) {
		return this.questionService.getQuestion(questionId);
	}

	@PutMapping("/updateQuestion")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}

	@GetMapping("/fetchAllQuestions")
	public ResponseEntity<?> getQuestions() {
		return ResponseEntity.ok(this.questionService.getQuestions());
	}

	@GetMapping("/fetchAssessmentQuestions/{assessmentId}")
	public ResponseEntity<?> getQuestionsOfAssessment(@PathVariable("assessmentId") Long assessmentId) {
		Assessment assessment = new Assessment();
		assessment.setAssessmentId(assessmentId);
		Set<Question> questionsOfAssessment = this.questionService.getQuestionsOfAssessment(assessment);
		return ResponseEntity.ok(questionsOfAssessment);
	}
	
	@DeleteMapping("deleteQuestion/{questionId}")
	public void deleteQuestion(@PathVariable("questionId") Long questionId ) {
		this.questionService.deleteQuestion(questionId);
	}
}

