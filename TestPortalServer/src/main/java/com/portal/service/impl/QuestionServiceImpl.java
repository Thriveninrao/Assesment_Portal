package com.portal.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.model.assessment.Assessment;
import com.portal.model.assessment.Question;
import com.portal.repository.QuestionRepository;
import com.portal.service.QuestionServiceInterface;

@Service
public class QuestionServiceImpl implements QuestionServiceInterface {

	@Autowired
	private QuestionRepository questionRepo;

	@Override
	public Question addQuestion(Question question) {
		return this.questionRepo.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepo.save(question);
	}

	@Override
	public Set<Question> getQuestions() {
		return new LinkedHashSet<>(this.questionRepo.findAll());
	}

	@Override
	public Question getQuestion(Long questionId) {
		return this.questionRepo.findById(questionId).get();
	}

	@Override
	public Set<Question> getQuestionsOfAssessment(Assessment assessment) {
		return this.questionRepo.findByAssessment(assessment);
	}

	@Override
	public void deleteQuestion(Long questionId) {
		this.questionRepo.deleteById(questionId);
	}

}
