package com.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import com.portal.model.assessment.TestResult;

public interface TestResultRepo extends JpaRepository<TestResult, Long> {
	
	@Query("select u from TestResult u where u.assessmentId=:assessmentId")
	public List<TestResult> gettestResultslist(@Param("assessmentId") Long assessmentId);

}
