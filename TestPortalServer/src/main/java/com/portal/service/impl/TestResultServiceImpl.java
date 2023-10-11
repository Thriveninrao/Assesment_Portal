package com.portal.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.model.assessment.TestResult;
import com.portal.repository.TestResultRepositories;
import com.portal.service.TestResultService;

@Service
public class TestResultServiceImpl implements TestResultService {

	@Autowired
	private TestResultRepositories testResultRepo;

	@Override
	public TestResult insertTestResult(TestResult testResult) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date today = new Date();
		String formattedDate = sdf.format(today);
		testResult.setAssessmentTookDate(formattedDate);
		TestResult save = testResultRepo.save(testResult);
		return save;
	}

}
