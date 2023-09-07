package com.portal.model.assessment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long questionId;

	@Column(length = 5000)
	private String content;

	@Column(length = 5000)
	private String image;

	@Column(length = 1000)
	private String option1;
	@Column(length = 1000)
	private String option2;
	@Column(length = 1000)
	private String option3;
	@Column(length = 1000)
	private String option4;
	@Column(length = 1000)
	private String answer;
	
	private Integer marks;

	@ManyToOne(fetch = FetchType.EAGER)
	private Assessment assessment;
}
