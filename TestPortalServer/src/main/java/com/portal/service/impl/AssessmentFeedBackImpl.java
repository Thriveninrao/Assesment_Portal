package com.portal.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.model.assessment.AssessmentFeedBack;
import com.portal.repository.AssessmentFeedBackRepository;
import com.portal.service.AssessmentFeedBackServiceInterface;

@Service
public class AssessmentFeedBackImpl implements AssessmentFeedBackServiceInterface {
	@Autowired
	private AssessmentFeedBackRepository assessFeedbackRepo;

	@Override
	public AssessmentFeedBack savefeedback(AssessmentFeedBack feedback) {
		System.out.println("1");
		return assessFeedbackRepo.save(feedback);

	}

}
