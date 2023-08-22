package com.softtek.controllers;

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

import com.softtek.entities.Assessment;
import com.softtek.serviceImpl.AssessmentServiceImpl;

import io.swagger.models.Response;

@RestController()
@RequestMapping("/assessment")
@CrossOrigin("")
public class AssessmentController {
	@Autowired
	private AssessmentServiceImpl assessmentService;

	@PostMapping("/addAssesment")
	public ResponseEntity<?> addAssessment(@RequestBody Assessment assessment) {
		try {
			return ResponseEntity.ok(assessmentService.addAssessment(assessment));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Couldn't insert Assessment", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/getAssessment/{assessmentId}")
	public ResponseEntity<?> getAssessment(@PathVariable("assessmentId") Long assessmentId) {
		try {
			return ResponseEntity.ok(assessmentService.getAssessment(assessmentId));
		} catch (Exception e) {
			return new ResponseEntity<>("Id not found", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/updateAsessment")
	public ResponseEntity<?> updateAssessment(@RequestBody Assessment assessment) {
		try {
			return ResponseEntity.ok(this.assessmentService.updateAssessment(assessment));
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>("couldn't update", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getAllAssessments")
	public ResponseEntity<?> getAssessments() {
		try {
			return ResponseEntity.ok(this.assessmentService.getAssessments());
		} catch (Exception e) {
			return new ResponseEntity<>("couldnt get all requests", HttpStatus.OK);
		}
	}

	@DeleteMapping("/delete/{assessmentId}")
	public ResponseEntity<?> deleteAssessment(@PathVariable("assessmentId") Long assessmentId) {
		try {
			this.assessmentService.deleteAssessment(assessmentId);
			return new ResponseEntity<>("deleted", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("couldn't delete", HttpStatus.OK);
		}
	}

}
