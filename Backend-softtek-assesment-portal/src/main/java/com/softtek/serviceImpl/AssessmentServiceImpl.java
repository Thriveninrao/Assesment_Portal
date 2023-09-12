package com.softtek.serviceImpl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softtek.entities.Assessment;
import com.softtek.repositories.AssessmentRepository;
import com.softtek.services.IAssessmentService;

@Service
public class AssessmentServiceImpl implements IAssessmentService {

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

		}

	}

}
