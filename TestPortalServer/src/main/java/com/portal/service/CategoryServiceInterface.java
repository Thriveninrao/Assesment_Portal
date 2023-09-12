package com.portal.service;

import java.util.Set;

import com.portal.model.assessment.Category;

public interface CategoryServiceInterface {

	public Category addCategory(Category category);

	public Category updateCategotry(Category category);

	public Set<Category> getCategories();

	public Category getCategory(Long categoryId);

	public void deleteCategory(Long categoryId);
}
