package com.portal.service.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portal.model.assessment.Assessment;
import com.portal.model.assessment.AssessmentFeedBack;
import com.portal.model.data.ResultOfAssessment;
import com.portal.repository.AssessmentFeedBackRepository;
import com.portal.service.AssessmentServiceInterface;
import com.portal.service.AssessmentFeedBackServiceInterface;

@Service
public class AssessmentFeedBackImpl implements AssessmentFeedBackServiceInterface {
	@Autowired
	private AssessmentFeedBackRepository assessFeedbackRepo;
  
	@Override
	public AssessmentFeedBack savefeedback(AssessmentFeedBack feedback) {
	return assessFeedbackRepo.save(feedback);
	}

}
