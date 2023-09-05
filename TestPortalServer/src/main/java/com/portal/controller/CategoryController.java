package com.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.model.assessment.Category;
import com.portal.service.CategoryServiceInterface;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

	@Autowired
	private CategoryServiceInterface catService;

	// add category
	@PostMapping("/")
	public ResponseEntity<?> addCategory(@RequestBody Category category) {
		try {
			return ResponseEntity.ok(catService.addCategory(category));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Something went wrong in Controller", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// get Category
	@GetMapping("/{categoryId}")
	public Category getCategory(@PathVariable("categoryId") Long categoryId) {
		return this.catService.getCategory(categoryId);
	}

	// update category
	@PutMapping("/update")
	public ResponseEntity<?> updateCategory(@RequestBody Category category) {
		try {
			return ResponseEntity.ok(this.catService.updateCategotry(category));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Something went wrong in Controller", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// get all categories
	@GetMapping("/")
	public ResponseEntity<?> getCategories() {
		return ResponseEntity.ok(this.catService.getCategories());
	}

	// delete Category
	@DeleteMapping("/{categoryId}")
	public void deleteCategory(@PathVariable("categoryId") Long categoryId) {
		this.catService.deleteCategory(categoryId);
	}
}
