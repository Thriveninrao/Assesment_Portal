package com.portal.controller;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
@CrossOrigin(origins = "http://localhost:4200/")
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

	@DeleteMapping("/{assessmentId}")
	public void deleteAssessment(@PathVariable("assessmentId") Long assessmentId) {
		this.assessmentService.deleteAssessment(assessmentId);
	}
	
	@GetMapping(value = "/ExportAllQuestions/{assesmentId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<?> downloadExcel(@PathVariable String assesmentId ) {
		try {
			System.out.println(assesmentId);
			long assesmentId1 =Long.parseLong(assesmentId);
			ByteArrayInputStream exportPensionDataToExcel = assessmentService.getAllQuestions(assesmentId1);

			Resource resource = new InputStreamResource(exportPensionDataToExcel);
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Disposition", "attachment; filename=AssesmentQuestions.xlsx");
			System.out.println("bulkOps.downloadExcel()");
			return new ResponseEntity<>(resource, headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);

		}
	}
}
