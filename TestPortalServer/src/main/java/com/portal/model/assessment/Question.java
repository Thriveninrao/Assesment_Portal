package com.portal.model.assessment;

import java.util.Objects;

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

	@Override
	public String toString() {
		return "Question [questionId=" + questionId + ", content=" + content + ", option1=" + option1 + ", option2="
				+ option2 + ", option3=" + option3 + ", option4=" + option4 + ", answer=" + answer + ", marks=" + marks
				+ "]";
	}

	 @Override
	    public int hashCode() {
	        return Objects.hash(content, option1, option2, option3, option4, answer, marks);
	    }
	 
	 @Override
	    public boolean equals(Object obj) {
	        if (this == obj)
	            return true;
	        if (obj == null || getClass() != obj.getClass())
	            return false;
	        Question other = (Question) obj;
	        return Objects.equals(content, other.content)
	                && Objects.equals(option1, other.option1)
	                && Objects.equals(option2, other.option2)
	                && Objects.equals(option3, other.option3)
	                && Objects.equals(option4, other.option4)
	                && Objects.equals(answer, other.answer)
	                && Objects.equals(marks, other.marks);
	    }
	
	
}
