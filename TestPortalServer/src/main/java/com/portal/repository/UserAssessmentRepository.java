package com.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.model.UserAssessmentAssignment;

public interface UserAssessmentRepository extends JpaRepository<UserAssessmentAssignment, Long> {

	@Query("SELECT uaa FROM UserAssessmentAssignment uaa WHERE uaa.user.id = :userId")
    public List<UserAssessmentAssignment> getUserAssessmentByUserId(@Param("userId") Long userId);
	
	
	// this suits good only when for one useriD only one time assesmentId in  db 
	@Modifying
	@Query("UPDATE UserAssessmentAssignment u SET u.marksObtained = :marksObtained WHERE u.assessment.assessmentId = :assessmentId AND u.user.id = :userId")
	public int setMarksOfAssessment(@Param("userId") Long userId, @Param("assessmentId") Long assessmentId, @Param("marksObtained") Integer marksObtained);

	@Modifying
	@Query("UPDATE UserAssessmentAssignment u SET u.marksObtained = :marksObtained WHERE u.assignId=:Assign_Id")
	public int setMarksBasedOnAssign_id( @Param("marksObtained") Integer marksObtained,@Param("Assign_Id") Long Assign_Id);

}