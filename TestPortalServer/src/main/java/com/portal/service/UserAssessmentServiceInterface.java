package com.portal.service;

import java.util.List;

import com.portal.model.UserAssessmentAssignment;

public interface UserAssessmentServiceInterface {

	public List<UserAssessmentAssignment>  getAllUserAssesemenAssignmentByUserId(Long userId);

}
