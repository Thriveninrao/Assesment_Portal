package com.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.model.UserAssessmentAssignment;

public interface UserAssessmentRepository extends JpaRepository<UserAssessmentAssignment, Long> {

	@Query("SELECT uaa FROM UserAssessmentAssignment uaa WHERE uaa.user.id = :userId")
    public List<UserAssessmentAssignment> getUserAssessmentByUserId(@Param("userId") Long userId);

}