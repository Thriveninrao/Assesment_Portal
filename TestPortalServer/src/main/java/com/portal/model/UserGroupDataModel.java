package com.portal.model;

import java.util.List;

import lombok.Data;

@Data
public class UserGroupDataModel {
	private Long groupId;
	private String groupName;
	private List<User> userList;
	
	@Override
	public String toString() {
		return "UserGroupDataModel [groupId=" + groupId + ", groupName=" + groupName + ", userList=" + userList + "]";
	}
}
