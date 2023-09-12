package com.portal.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.model.assessment.Assessment;
import com.portal.model.assessment.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
	Set<Question> findByAssessment(Assessment assessment);
}
