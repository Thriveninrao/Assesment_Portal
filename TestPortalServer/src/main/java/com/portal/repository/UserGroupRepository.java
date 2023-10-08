package com.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.model.UserGroup;

public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
	@Query("SELECT count(ugu.userGroupUserId) FROM UserGroupUser ugu WHERE ugu.userGroup.groupName = :groupName")
	public Integer getCountOfUserGroupByGroupName(@Param("groupName") String groupName);

}
