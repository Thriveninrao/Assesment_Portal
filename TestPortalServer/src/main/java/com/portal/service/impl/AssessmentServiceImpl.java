package com.portal.service.impl;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.model.assessment.Assessment;
import com.portal.model.assessment.Question;
import com.portal.repository.AssessmentRepository;
import com.portal.service.AssessmentServiceInterface;

@Service
public class AssessmentServiceImpl implements AssessmentServiceInterface {

	@Autowired
	private AssessmentRepository assessRepo;

	@Override
	public Assessment addAssessment(Assessment assessment) {
		return this.assessRepo.save(assessment);
	}

	@Override
	public Assessment updateAssessment(Assessment assessment) {
		return this.assessRepo.save(assessment);
	}

	@Override
	public Set<Assessment> getAssessments() {

		return new LinkedHashSet<Assessment>(this.assessRepo.findAll());
	}

	@Override
	public Assessment getAssessment(Long assessmentId) {

		return this.assessRepo.findById(assessmentId).get();
	}

	@Override
	public void deleteAssessment(Long assessmentId) {
		Assessment assessment = assessRepo.findById(assessmentId).get();
		System.out.println(assessment.getAssessmentTitle());
		if (assessment != null) {
			assessRepo.deleteById(assessmentId);
			System.out.println("1");
		}

	}

	@Override
	public Assessment updateAssessmentQuestions(Long assessmentId) {
		Assessment assessment = assessRepo.findById(assessmentId).get();
		assessment.setNumberOfQuestions(assessment.getQuestions().size());
		Integer totalMarks = 0;
		for (Question question : assessment.getQuestions()) {
			totalMarks += question.getMarks();
		}
		System.out.println("Total Marks :: " + totalMarks);
		assessment.setMaxMarks(totalMarks);
		return this.assessRepo.save(assessment);
	}

}
