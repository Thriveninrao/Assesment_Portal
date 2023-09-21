package com.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.portal.service.UserAssessmentServiceInterface;

@RestController
@CrossOrigin("*")
public class UserAssessmentController {
	@Autowired
	private UserAssessmentServiceInterface userAssessmentService;
	
	
}
