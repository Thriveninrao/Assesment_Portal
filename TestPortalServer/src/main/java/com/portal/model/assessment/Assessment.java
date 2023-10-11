package com.portal.model.assessment;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.portal.model.User;
import com.portal.model.UserAssessmentAssignment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ASSESSMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Assessment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long assessmentId;

	private String assessmentTitle;

	@Column(length = 5000)
	private String assessmentDescription;

	private Integer maxMarks;

	private Integer numberOfQuestions;

	private boolean active = false;

	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;

	private String assessmentImage;

	@ManyToOne(fetch = FetchType.EAGER)
	private User user;

	@OneToMany(mappedBy = "assessment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Question> questions = new HashSet<>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "assessment")
	@JsonIgnore
	private Set<UserAssessmentAssignment> userAssessmentAssignment = new HashSet<>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "assessment")
	@JsonIgnore
	private Set<AssessmentGroupAssessment> assessmentGroupAssessment = new HashSet<>();
}
