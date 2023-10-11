package com.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.model.assessment.TestResult;

public interface TestResultRepositories extends JpaRepository<TestResult, Long> {

}
