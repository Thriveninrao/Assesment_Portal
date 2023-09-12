package com.portal.model;

import java.util.Set;

import lombok.Data;

@Data
public class DataSent {
	private Set<UserData> selectedUsers;
	private Set<AssessmentData> selectedAssessments;
}
