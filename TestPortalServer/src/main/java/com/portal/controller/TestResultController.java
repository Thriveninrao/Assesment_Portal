package com.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.model.assessment.TestResult;
import com.portal.service.TestResultService;

@RestController
@RequestMapping("/testResult")
@CrossOrigin("*")
public class TestResultController {
	@Autowired
	private TestResultService testService;

	@PostMapping("/")
	public ResponseEntity<?> addTestResult(@RequestBody TestResult testResult) {
		try {
			return ResponseEntity.ok(testService.insertTestResult(testResult));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Something went wrong in Controller", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
