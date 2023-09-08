package com.portal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.portal.model.assessment.Assessment;

import lombok.Data;

@Entity
@Data
public class UserAssessmentAssignment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long assignId;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	private Assessment assessment;
}
