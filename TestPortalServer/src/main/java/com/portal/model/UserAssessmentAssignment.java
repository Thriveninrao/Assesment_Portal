package com.portal.model;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private User user;
	
	@Column
	private Boolean testAttempted = false;
	
	@ManyToOne
	private Assessment assessment;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserAssessmentAssignment other = (UserAssessmentAssignment) obj;
		return Objects.equals(assignId, other.assignId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(assignId);
	}

	@Override
	public String toString() {
		return "UserAssessmentAssignment [assessment=" + assessment.getAssessmentTitle() + "]";
	}
	
}
