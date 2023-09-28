package com.portal.controller;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portal.model.ResultOfAssessment;
import com.portal.model.UserAssessmentAssignment;
import com.portal.model.assessment.Assessment;
import com.portal.service.AssessmentServiceInterface;
import com.portal.service.UserAssessmentServiceInterface;

@RestController
@RequestMapping("/assessment")
@CrossOrigin(origins = "http://localhost:4200/")
public class AssessmentController {

	@Autowired
	private AssessmentServiceInterface assessmentService;

	@Autowired
	private UserAssessmentServiceInterface userAssessService;

	@PostMapping("/")
	public ResponseEntity<?> addAssessment(@RequestBody Assessment assessment) {
		try {
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

	@GetMapping("/userAssessment/{userId}")
	public ResponseEntity<?> getUserAssessment(@PathVariable("userId") Long userId) {
		List<UserAssessmentAssignment> userAssessList = userAssessService.getAllUserAssesemenAssignmentByUserId(userId);
		List<Assessment> assessList = new ArrayList<Assessment>();
		userAssessList.forEach((userAssess) -> {
			assessList.add(userAssess.getAssessment());
		});
		return ResponseEntity.ok(assessList);
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
	public ResponseEntity<?> downloadExcel(@PathVariable String assesmentId) {
		try {
			System.out.println("AssessmentController.downloadExcel()");
			long assesmentId1 = Long.parseLong(assesmentId);
			ByteArrayInputStream exportPensionDataToExcel = assessmentService.getAllQuestions(assesmentId1);

			Resource resource = new InputStreamResource(exportPensionDataToExcel);
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Disposition", "attachment; filename=AssesmentQuestions.xlsx");
			return new ResponseEntity<>(resource, headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);

		}
	}

	@GetMapping("/question/{assessmentId}")
	public ResponseEntity<Assessment> updateAssessmentQuestionsList(@PathVariable("assessmentId") Long assessmentId) {
		return ResponseEntity.ok(this.assessmentService.updateAssessmentQuestions(assessmentId));
	}

	@PostMapping("/InsertAllQuestionInAssesment/{AssesmentId}")
	public ResponseEntity<?> uploadBulkFileUpdate(@PathVariable("AssesmentId") Long AssesmentId,
			@RequestParam("file") MultipartFile file) {
		try {
			System.out.println("AssessmentController.uploadBulkFileUpdate()");
			String bulkEmployeesFromCsvCount = assessmentService.InsertAllQuestions(AssesmentId, file);
			return ResponseEntity.ok().body(bulkEmployeesFromCsvCount);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file!!!");
		}
	}
	@GetMapping("/resultsOfAssessment/{assessmentId}")
	public ResponseEntity<?> GetAttendentsAndResults(@PathVariable("assessmentId") Long assessmentId){
		try {
			System.out.println("AssessmentController.GetAttendentsAndResults()");
			Set<ResultOfAssessment> resultListOfAssessment = assessmentService.getResultListOfAssessment(assessmentId);
			return new ResponseEntity<>(resultListOfAssessment,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}



}
