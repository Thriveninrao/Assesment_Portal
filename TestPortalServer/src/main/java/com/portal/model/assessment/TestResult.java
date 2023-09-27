package com.portal.model.assessment;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.portal.model.User;

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

	private Integer marksObtained;

	private Integer questionsAttepmted;

	private Integer maxMarks;

	private Long userId;
}
