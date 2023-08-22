package com.portal.model.assessment;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

	private String assessmentDescription;

	private String maxMarks;

	private String numberOfQuestions;

	private boolean active = false;

	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;

	private String assessmentImage;

	@OneToMany(mappedBy = "assessment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Question> questions = new HashSet<>();

	// add more Attributes
}
