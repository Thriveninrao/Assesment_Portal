package com.portal.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portal.model.assessment.Assessment;
import com.portal.model.assessment.Question;
import com.portal.repository.AssessmentRepository;
import com.portal.repository.QuestionRepository;
import com.portal.service.AssessmentServiceInterface;

@Service
public class AssessmentServiceImpl implements AssessmentServiceInterface {

	@Autowired
	private AssessmentRepository assessRepo;
	@Autowired
	private QuestionRepository questionRepo;

	@Override
	public Assessment addAssessment(Assessment assessment) {
		return this.assessRepo.save(assessment);
	}

	@Override
	public Assessment updateAssessment(Assessment assessment) {
		return this.assessRepo.save(assessment);
	}

	@Override
	public Set<Assessment> getAssessments() {

		return new LinkedHashSet<Assessment>(this.assessRepo.findAll());
	}

	@Override
	public Assessment getAssessment(Long assessmentId) {

		return this.assessRepo.findById(assessmentId).get();
	}

	@Override
	public void deleteAssessment(Long assessmentId) {
		Assessment assessment = assessRepo.findById(assessmentId).get();
		System.out.println(assessment.getAssessmentTitle());
		if (assessment != null) {
			assessRepo.deleteById(assessmentId);
			System.out.println("1");
		}

	}

	@Override
	public ByteArrayInputStream getAllQuestions(long AssesmentId) throws IOException {
		Set<Question> questionsList = assessRepo.findById(AssesmentId).get().getQuestions();
		int noOfQuestions = questionsList.size();
		try (
				// Create a new workbook
				Workbook workbook = new XSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Questions Exported");
			sheet.protectSheet("Softtek@2023");

			// Create header row
			Row headerRow = sheet.createRow(0);
			// Styling for header
			CellStyle style = workbook.createCellStyle();
			Font font = workbook.createFont();
			font.setFontName(HSSFFont.FONT_ARIAL);
			font.setColor(IndexedColors.ORANGE.getIndex());
			font.setFontHeightInPoints((short) 10);
			font.setBold(true);
			style.setFont(font);
			style.setLocked(true);

			// setting values for header row
			headerRow.createCell(0).setCellValue("Question");
			headerRow.createCell(1).setCellValue("Option 1");
			headerRow.createCell(2).setCellValue("Option 2");
			headerRow.createCell(3).setCellValue("Option 3");
			headerRow.createCell(4).setCellValue("Option 4");
			headerRow.createCell(5).setCellValue("Answer");
			headerRow.createCell(6).setCellValue("Marks");

			
			// till 10th column style will be aplied
			for (int j = 0; j <=6; j++)
				headerRow.getCell(j).setCellStyle(style);

			int rowNum = 1;
			System.out.println(questionsList);
			for (Question quest : questionsList) {
				Row row = sheet.createRow(rowNum++);
				row.createCell(0).setCellValue(quest.getContent());
				row.createCell(1).setCellValue(quest.getOption1());
				row.createCell(2).setCellValue(quest.getOption2());
				row.createCell(3).setCellValue(quest.getOption3());
				row.createCell(4).setCellValue(quest.getOption4());
				row.createCell(5).setCellValue(quest.getAnswer());
				row.createCell(6).setCellValue(quest.getMarks());
			}
			// Auto-size columns
			for (int i = 0; i <= 10; i++) {
				sheet.autoSizeColumn(i);
			}
			// Write workbook to byte array
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			workbook.write(outputStream);
			byte[] bytes = outputStream.toByteArray();

			// Return byte array as a ByteArrayInputStream
			System.out.println("AssessmentServiceImpl.getAllQuestions()");
			return new ByteArrayInputStream(bytes);

		}

	}

	public Assessment updateAssessmentQuestions(Long assessmentId) {
		Assessment assessment = assessRepo.findById(assessmentId).get();
		assessment.setNumberOfQuestions(assessment.getQuestions().size());
		Integer totalMarks = 0;
		for (Question question : assessment.getQuestions()) {
			totalMarks += question.getMarks();
		}
		System.out.println("Total Marks :: " + totalMarks);
		assessment.setMaxMarks(totalMarks);
		return this.assessRepo.save(assessment);
	}
	@Override
	public String InsertAllQuestions(long AssesmentId, MultipartFile file) throws IOException {
		System.out.println("AssessmentServiceImpl.InsertAllQuestions()");
		 List<Question> questionlist =new ArrayList<Question>(); 
		Integer count = 0;
		Workbook workbook = null;
		try {
			workbook = WorkbookFactory.create(file.getInputStream());
			Sheet sheet = workbook.getSheetAt(0);

			for (Row row : sheet) {

				// skip header row
				if (row.getRowNum() == 0) {
					continue;
				}

				Question Q=new Question();

				Q.setContent(row.getCell(0).getStringCellValue());
				Q.setOption1(row.getCell(1).getStringCellValue());
				Q.setOption2(row.getCell(2).getStringCellValue());
				Q.setOption3(row.getCell(3).getStringCellValue());
				Q.setOption4(row.getCell(4).getStringCellValue());
				Q.setAnswer(row.getCell(5).getStringCellValue());
			//	Q.setMarks(Integer.parseInt(row.getCell(6).getStringCellValue()));
				Q.setMarks((int)row.getCell(6).getNumericCellValue());
				Q.setAssessment(assessRepo.getReferenceById(AssesmentId));
				questionlist.add(Q);
			}

			List<Question> savedAll = questionRepo.saveAll(questionlist);
			System.out.println(savedAll.size());
		//	System.out.println(savedAll);
			return "File uploaded successfully!!! and " + count + " number of questions are added";

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			workbook.close();
		}
	return "Please upload the file";
}
	

}
