package com.portal.model;

import java.util.ArrayList;

import lombok.Data;

@Data
public class UserGroupDataSent {
	private String groupName;
	private ArrayList<Integer> selectedUserIds;
}
