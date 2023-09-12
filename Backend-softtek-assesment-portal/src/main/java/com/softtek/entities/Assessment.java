package com.softtek.entities;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;

@Entity
@Data
@Table(name="assessment")
@Getter
public class Assessment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="assessment_id")
	private Long assessmentId;
    
	@Column(name="assessment_title")
	private String assessmentTitle;


	@Column(name="assessment_description")
	private String assessmentDescription;
     
	
	private String maxMarks;

	
	private String numberOfQuestions;

	private boolean active = false;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;
	
	@OneToMany(mappedBy = "assessment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Question> questions = new HashSet<>();

	

}
