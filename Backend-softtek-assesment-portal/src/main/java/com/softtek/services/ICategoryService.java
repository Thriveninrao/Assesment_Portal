package com.softtek.services;

import java.util.Set;

import com.softtek.entities.Category;

/**
 * 
 * @author shivanagoud.annigeri
 *
 */
public interface ICategoryService {
	public Category addCategory(Category category);

	public Category updateCategotry(Category category);

	public Set<Category> getCategories();

	public Category getCategory(Long categoryId);

	public String deleteCategory(Long categoryId);

}
