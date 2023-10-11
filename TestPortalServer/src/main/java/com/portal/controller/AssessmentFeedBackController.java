package com.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.model.assessment.AssessmentFeedBack;
import com.portal.service.AssessmentFeedBackServiceInterface;
import com.portal.service.AssessmentServiceInterface;

@RestController
@RequestMapping("/assessmentfeedbackServcie")
public class AssessmentFeedBackController {
	
@Autowired
private AssessmentFeedBackServiceInterface assessmentFeedbackService;

@PostMapping("/addFeedback")
public ResponseEntity<?> AddFeedBack(@RequestBody AssessmentFeedBack assesmentFeedback){
		try {
			return new ResponseEntity<>(assessmentFeedbackService.savefeedback(assesmentFeedback),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("couldn't add feedback to database",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
