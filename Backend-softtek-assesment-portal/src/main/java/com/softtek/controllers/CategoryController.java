package com.softtek.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.softtek.entities.Category;
import com.softtek.serviceImpl.CategoryServiceImpl;
/**
 * 
 * @author shivanagoud.annigeri
 *
 */

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	@Autowired
	private CategoryServiceImpl catService;

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
	public ResponseEntity<?> getCategory(@PathVariable("categoryId") Long categoryId) {
		try {
			return new ResponseEntity<>(catService.getCategory(categoryId),HttpStatus.OK);
		} catch (Exception e) {
			return  new ResponseEntity<>("category not found",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

	
	// update category
	@PutMapping("/update")
	public ResponseEntity<?> updateCategory(@RequestBody Category category) {
		try {
			return ResponseEntity.ok(this.catService.updateCategotry(category));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("couldn't update", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// get all categories
	@GetMapping("/")
	public ResponseEntity<?> getCategories() {
		try {
			return ResponseEntity.ok(this.catService.getCategories());
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("couldn't get categories", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

	// delete Category
	@DeleteMapping("/{categoryId}")
	public ResponseEntity<String> deleteCategory(@PathVariable("categoryId") Long categoryId) {
		try {
			return ResponseEntity.ok(this.catService.deleteCategory(categoryId));
		} catch (Exception e) {
			return new ResponseEntity<String>("couldn't delete",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

}
