package com.portal.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.model.UserAssessmentAssignment;
import com.portal.repository.UserAssessmentRepository;
import com.portal.service.UserAssessmentServiceInterface;

@Service
public class UserAssessmentServiceImpl implements UserAssessmentServiceInterface {

	@Autowired
	private UserAssessmentRepository userAssessmentRepo;

	@Override
	public List<UserAssessmentAssignment> getAllUserAssesemenAssignmentByUserId(Long userId) {
		return userAssessmentRepo.getUserAssessmentByUserId(userId);
	}

}
