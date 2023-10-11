package com.portal.model;

import java.util.ArrayList;

import lombok.Data;

@Data
public class AssessmentGrouDataSent {
	private String groupName;
	private ArrayList<Integer> selectedAssessmentIds;
}
