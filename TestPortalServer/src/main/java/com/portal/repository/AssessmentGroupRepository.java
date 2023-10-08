package com.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.model.assessment.AssessmentGroup;

public interface AssessmentGroupRepository extends JpaRepository<AssessmentGroup, Long> {
//	@Query("SELECT ag.groupId FROM AssessmentGroup ag JOIN ag.assessmentList a WHERE a.assessmentId = :assessmentId")
//	public List<Long> getAssessmentGroupNamesByAssessmentId(@Param("assessmentId") Long assessmentId);

	@Query("SELECT count(aga.assessGroupAssessId) FROM AssessmentGroupAssessment aga WHERE aga.assessmentGroup.groupName = :groupName")
	public Integer getCountOfAssessmentGroupByGroupName(@Param("groupName") String groupName);

}
