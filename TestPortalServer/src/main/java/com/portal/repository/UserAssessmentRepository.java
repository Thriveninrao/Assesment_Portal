package com.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.model.User;
import com.portal.model.UserAssessmentAssignment;

public interface UserAssessmentRepository extends JpaRepository<User, Long> {

	@Query("SELECT assessment FROM UserAssessmentAssignment WHERE user=:userId")
	public List<UserAssessmentAssignment> getByUserAssessment(@Param("userId") Long user);

}