package com.portal.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.model.assessment.AssessmentGroup;

public interface AssessmentGroupRepository extends JpaRepository<AssessmentGroup, Long> {

	@Query("SELECT ag FROM AssessmentGroup ag JOIN FETCH ag.assessmentGroupAssessment aga JOIN FETCH aga.assessment WHERE ag.groupId = :groupId")
	AssessmentGroup findByIdWithAssessments(@Param("groupId") Long groupId);

	@Query("SELECT ag FROM AssessmentGroup ag JOIN FETCH ag.assessmentGroupAssessment aga JOIN FETCH aga.assessment WHERE ag.groupName = :groupName")
	AssessmentGroup findByNameWithAssessments(@Param("groupName") String groupName);

	@Query("SELECT ag FROM AssessmentGroup ag JOIN FETCH ag.assessmentGroupAssessment aga JOIN FETCH aga.assessment")
	List<AssessmentGroup> findAllWithAssessments();

	@Query("SELECT count(aga.assessGroupAssessId) FROM AssessmentGroupAssessment aga WHERE aga.assessmentGroup.groupName = :groupName")
	public Integer getCountOfAssessmentGroupByGroupName(@Param("groupName") String groupName);

	@Transactional
	@Modifying
	@Query(value = "DELETE FROM AssessmentGroupAssessment WHERE assessGroupAssessId = :assessGroupAssessId")
	public void deleteAssessmentGroupAssessmentByAssessGroupAssessId(@Param("assessGroupAssessId") Long assessGroupAssessId);

}
