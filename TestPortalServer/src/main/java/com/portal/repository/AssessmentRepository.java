package com.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.model.assessment.Assessment;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

//	Collection<? extends Assessment> findAllByUserId();

}
