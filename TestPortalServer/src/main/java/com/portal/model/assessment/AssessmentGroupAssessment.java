package com.portal.model.assessment;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class AssessmentGroupAssessment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long assessGroupAssessId;

	@ManyToOne
	private Assessment assessment;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private AssessmentGroup assessmentGroup;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AssessmentGroupAssessment other = (AssessmentGroupAssessment) obj;
		return Objects.equals(assessGroupAssessId, other.assessGroupAssessId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(assessGroupAssessId);
	}

	@Override
	public String toString() {
		return "AssessmentGroupAssessment [assessment group =" + assessmentGroup.getGroupName() + "]";
	}

}
