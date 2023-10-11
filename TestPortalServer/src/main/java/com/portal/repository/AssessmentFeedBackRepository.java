package com.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.model.assessment.AssessmentFeedBack;

public interface AssessmentFeedBackRepository extends JpaRepository<AssessmentFeedBack, Long> {

}
