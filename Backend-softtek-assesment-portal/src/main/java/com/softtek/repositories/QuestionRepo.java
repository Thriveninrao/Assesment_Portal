package com.softtek.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.softtek.entities.Question;

public interface QuestionRepo extends JpaRepository<Question, Long> {
	

}
