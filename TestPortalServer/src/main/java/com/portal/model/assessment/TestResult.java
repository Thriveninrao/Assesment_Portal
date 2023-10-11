package com.portal.model.assessment;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestResult {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long resultId;

	private Long assessmentId;
	
	private String assessmentTookDate;

	private Integer marksObtained;

	private Integer questionsAttepmted;

	private Integer maxMarks;

	private Long userId;

	
}
