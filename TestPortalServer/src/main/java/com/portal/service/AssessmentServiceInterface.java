package com.portal.service;

import java.util.Set;

import com.portal.model.assessment.Assessment;

public interface AssessmentServiceInterface {
	
	public Assessment addAssessment(Assessment assessment);
	
	public Assessment updateAssessment(Assessment assessment);
	
	public Set<Assessment> getAssessments();
	
	public Assessment getAssessment(Long assessmentId);
	
	public void deleteAssessment(Long assessmentId);
}
