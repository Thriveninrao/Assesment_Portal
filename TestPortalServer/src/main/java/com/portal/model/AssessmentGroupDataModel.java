package com.portal.model;

import java.util.List;

import com.portal.model.assessment.Assessment;

import lombok.Data;

@Data
public class AssessmentGroupDataModel {
	private Long groupId;
	private String groupName;
	private List<Assessment> assessmentList;

	@Override
	public String toString() {
		return "AssessmentGroupDataModel [groupId=" + groupId + ", groupName=" + groupName + ", assessmentList="
				+ assessmentList + "]";
	}
}
