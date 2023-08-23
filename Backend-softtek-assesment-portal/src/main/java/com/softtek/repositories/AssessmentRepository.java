package com.softtek.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.softtek.entities.Assessment;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

}
