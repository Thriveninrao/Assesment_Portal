package com.portal.model.assessment;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "ASSESSMENT_GROUP")
@Data
public class AssessmentGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long groupId;

	private String groupName;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "assessmentGroup")
	@JsonIgnore
	private List<AssessmentGroupAssessment> assessmentGroupAssessment = new ArrayList<>();

	@Override
	public String toString() {
		System.out.println("-------------------------------------------------------------------------");
		System.out.println("Assessment Group :: " + groupName);
		System.out.println("Assessments in this group :: ");
		assessmentGroupAssessment.forEach((assessGroup) -> {
			System.out.println(assessGroup.getAssessment().getAssessmentTitle());
		});
		System.out.println("-------------------------------------------------------------------------");
		return "AssessmentGroup [groupId=" + groupId + ", groupName=" + groupName;
	}

}
