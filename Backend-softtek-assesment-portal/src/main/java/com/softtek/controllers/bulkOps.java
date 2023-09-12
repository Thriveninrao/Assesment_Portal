package com.softtek.controllers;

import java.io.ByteArrayInputStream;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.softtek.entities.Assessment;
import com.softtek.serviceImpl.AssessmentServiceImpl;
import com.softtek.services.IQuestionService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/bulkOps")
@CrossOrigin(origins = "http://localhost:4200/")
public class bulkOps {
	@Autowired
	private IQuestionService questionService;
 
	
	
	
	@GetMapping(value = "/ExportAllQuestions/{assesmentId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<?> downloadExcel(@PathVariable String assesmentId ) {
		try {
			
			System.out.println(assesmentId);
			long assesmentId1 =Long.parseLong(assesmentId);
			ByteArrayInputStream exportPensionDataToExcel = questionService.getAllQuestions(assesmentId1);

			Resource resource = new InputStreamResource(exportPensionDataToExcel);
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Disposition", "attachment; filename=AssesmentQuestions.xlsx");
			System.out.println("bulkOps.downloadExcel()");
			return new ResponseEntity<>(resource, headers, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);

		}
	}
}
