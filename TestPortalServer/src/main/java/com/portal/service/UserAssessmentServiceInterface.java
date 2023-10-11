package com.portal.service;

import java.util.List;

import com.portal.model.UserAssessmentAssignment;

public interface UserAssessmentServiceInterface {

	public List<UserAssessmentAssignment>  getAllUserAssesemenAssignmentByUserId(Long userId);
	//public Integer setMarksOfAssessment(Long assesmentId, Long userId, Integer marksObtained);
	public Integer setMarksOfAssessment(Integer marksObtained,Long AssignId);

}
