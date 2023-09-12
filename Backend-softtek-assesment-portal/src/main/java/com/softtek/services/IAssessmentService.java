package com.softtek.services;

import java.util.Set;

import com.softtek.entities.Assessment;

public interface IAssessmentService {
	public Assessment addAssessment(Assessment assessment);
	
	public Assessment updateAssessment(Assessment assessment);
	
	public Set<Assessment> getAssessments();
	
	public Assessment getAssessment(Long assessmentId);
	
	public void deleteAssessment(Long assessmentId);
}
