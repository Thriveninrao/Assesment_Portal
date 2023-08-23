package com.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.portal.service.AssessmentServiceInterface;

@RestController
@RequestMapping("/assessment")
@CrossOrigin("*")
public class AssessmentController {

	@Autowired
	private AssessmentServiceInterface assessmentService;

	@PostMapping("/")
	public ResponseEntity<?> addAssessment(@RequestBody Assessment assessment) {
		try {
			System.out.println("Naveen");
			return ResponseEntity.ok(assessmentService.addAssessment(assessment));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Couldn't insert Assessment record", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/{assessmentId}")
	public Assessment getAssessment(@PathVariable("assessmentId") Long assessmentId) {
		return assessmentService.getAssessment(assessmentId);
	}

	@PutMapping("/")
	public ResponseEntity<Assessment> updateAssessment(@RequestBody Assessment assessment) {
		return ResponseEntity.ok(this.assessmentService.updateAssessment(assessment));
	}

	@GetMapping("/")
	public ResponseEntity<?> getAssessments() {
		return ResponseEntity.ok(this.assessmentService.getAssessments());
	}

	@DeleteMapping("/delete/{assessmentId}")
	public void deleteAssessment(@PathVariable("assessmentId") Long assessmentId) {
		this.assessmentService.deleteAssessment(assessmentId);
	}
}
