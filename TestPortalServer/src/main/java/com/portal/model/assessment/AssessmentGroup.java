package com.portal.model.assessment;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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
	private List<Assessment> assessmentList;
}
