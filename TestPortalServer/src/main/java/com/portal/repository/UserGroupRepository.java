package com.portal.repository;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.model.UserGroup;

public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
	@Query("SELECT count(ugu.userGroupUserId) FROM UserGroupUser ugu WHERE ugu.userGroup.groupName = :groupName")
	public Integer getCountOfUserGroupByGroupName(@Param("groupName") String groupName);

	@Query("SELECT ug FROM UserGroup ug JOIN FETCH ug.userGroupUser ugu JOIN FETCH ugu.user")
	Set<UserGroup> findAllWithUsers();
	
	@Query("SELECT ug FROM UserGroup ug JOIN FETCH ug.userGroupUser ugu JOIN FETCH ugu.user WHERE ug.groupId = :groupId")
	public UserGroup findByNameWithUsers(@Param("groupId") Long groupId);
	
	@Query("SELECT ug FROM UserGroup ug JOIN FETCH ug.userGroupUser ugu JOIN FETCH ugu.user WHERE ug.groupName = :groupName")
	public UserGroup findByNameWithUsers(@Param("groupName") String groupName);

	@Transactional
	@Modifying
	@Query(value = "DELETE FROM UserGroupUser WHERE userGroupUserId = :userGroupUserId")
	public void deleteUserGroupUserByUserGroupUserId(Long userGroupUserId);


}
