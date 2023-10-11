package com.portal.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.model.UserAssessmentAssignment;
import com.portal.repository.UserAssessmentRepository;
import com.portal.service.UserAssessmentServiceInterface;

@Service
@Transactional
public class UserAssessmentServiceImpl implements UserAssessmentServiceInterface {

	@Autowired
	private UserAssessmentRepository userAssessmentRepo;

	@Override
	public List<UserAssessmentAssignment> getAllUserAssesemenAssignmentByUserId(Long userId) {
		return userAssessmentRepo.getUserAssessmentByUserId(userId);
	}

	@Override
	//public Integer setMarksOfAssessment(Long assesmentId, Long userId,Integer marksObtained) {
	public Integer setMarksOfAssessment(Integer marksObtained,Long AssignId) {
		System.out.println("UserAssessmentServiceImpl.setMarksOfAssessment() service");
		try {
			//Integer markset= userAssessmentRepo.setMarksOfAssessment(userId, assesmentId, marksObtained);
			Integer markset=userAssessmentRepo.setMarksBasedOnAssign_id(marksObtained,AssignId);
			return markset;
		} catch (Exception e) {
			System.out.println(e);
			return 0;
		}
	   
	}



}
