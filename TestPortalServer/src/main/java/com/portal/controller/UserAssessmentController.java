package com.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.service.UserAssessmentServiceInterface;

@RestController()
@CrossOrigin("*")
public class UserAssessmentController {
	@Autowired
	private UserAssessmentServiceInterface userAssessmentService;
	
	//@PutMapping("setMarks/{assessmentId}/{userId}/{marksObtained}")
	//public ResponseEntity<?> setMarksOfAssessment(@PathVariable("assessmentId")Long assessmentId,@PathVariable("userId")Long userId,@PathVariable("marksObtained")Integer marksObtained){
	@PutMapping("setMarks/{marksObtained}/{AssignId}")
	  public ResponseEntity<?> setMarksOfAssessment(@PathVariable("marksObtained")Integer marksObtained,@PathVariable("AssignId")Long AssignId){
		try {
			System.out.println("UserAssessmentController.setMarksOfAssessment()");
			Integer setMarksOfAssessment = userAssessmentService.setMarksOfAssessment(marksObtained,AssignId);
			return new ResponseEntity<>(setMarksOfAssessment,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
}
