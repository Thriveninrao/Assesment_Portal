package com.portal.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

import com.portal.model.AssessmentGrouDataSent;
import com.portal.model.AssessmentGroupDataModel;
import com.portal.model.ResultOfAssessment;
import com.portal.model.SuccessMessage;
import com.portal.model.User;
import com.portal.model.assessment.Assessment;
import com.portal.model.assessment.AssessmentGroup;
import com.portal.model.assessment.AssessmentGroupAssessment;
import com.portal.model.assessment.Question;
import com.portal.model.assessment.TestResult;
import com.portal.repository.AssessmentGroupRepository;
import com.portal.repository.AssessmentRepository;
import com.portal.repository.QuestionRepository;
import com.portal.repository.TestResultRepo;
import com.portal.repository.UserRepository;
import com.portal.service.AssessmentServiceInterface;

@Service
public class AssessmentServiceImpl implements AssessmentServiceInterface {

	@Autowired
	private AssessmentRepository assessRepo;

	@Autowired
	private AssessmentGroupRepository assessGroupRepo;
	@Autowired
	private QuestionRepository questionRepo;
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private TestResultRepo testResultRepo;

	@Override
	public Assessment addAssessment(Assessment assessment) {
		User user = userRepo.findById(assessment.getUser().getId()).get();
		assessment.setUser(user);
		return this.assessRepo.save(assessment);
	}

	@Override
	public Assessment updateAssessment(Assessment assessment) {
		return this.assessRepo.save(assessment);
	}

	@Override
	public Set<Assessment> getAssessments() {
		System.out.println("------------------------------------------------------------------------------------\n");
		System.out.println("Based on ID :: " + this.assessGroupRepo.findByIdWithAssessments(17l) + "\n");
		System.out.println("------------------------------------------------------------------------------------\n");
		System.out.println("Full Data :: " + this.assessGroupRepo.findAllWithAssessments() + "\n");
		System.out.println("------------------------------------------------------------------------------------\n");
		return new LinkedHashSet<Assessment>(this.assessRepo.findAll());
	}

	@Override
	public Assessment getAssessment(Long assessmentId) {

		return this.assessRepo.getReferenceById(assessmentId);
	}

	@Override
	public void deleteAssessment(Long assessmentId) {
		Assessment assessment = assessRepo.findById(assessmentId).get();
		if (assessment != null) {
			assessRepo.deleteById(assessmentId);
			System.out.println("1");
		}

	}

	@Override
	public ByteArrayInputStream getAllQuestions(long AssesmentId) throws IOException {
		Set<Question> questionsList = assessRepo.findById(AssesmentId).get().getQuestions();
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
			for (int j = 0; j <= 6; j++)
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
		assessment.setMaxMarks(totalMarks);
		return this.assessRepo.save(assessment);
	}

	@Override
	public String InsertAllQuestions(long AssesmentId, MultipartFile file) throws IOException {
		System.out.println("AssessmentServiceImpl.InsertAllQuestions()");
		Set<Question> questionlist = new HashSet<Question>();
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

				Question Q = new Question();
				Q.setContent(row.getCell(0).getStringCellValue());
				Q.setOption1(row.getCell(1).getStringCellValue());
				Q.setOption2(row.getCell(2).getStringCellValue());
				Q.setOption3(row.getCell(3).getStringCellValue());
				Q.setOption4(row.getCell(4).getStringCellValue());
				Q.setAnswer(row.getCell(5).getStringCellValue());
				// Q.setMarks(Integer.parseInt(row.getCell(6).getStringCellValue()));
				Q.setMarks((int) row.getCell(6).getNumericCellValue());
				Q.setAssessment(assessRepo.getReferenceById(AssesmentId));
				questionlist.add(Q);
			}
			// questionlist.addAll(questionsAlreadyExist);

			@SuppressWarnings("unused")
			List<Question> savedAll = questionRepo.saveAll(questionlist);
			return "File uploaded successfully!!! and " + count + " number of questions are added";

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			workbook.close();
		}
		return "Please upload the file";
	}

	@Override
	public Set<ResultOfAssessment> getResultListOfAssessment(long AssesmentId) {
		List<TestResult> testResultslist = testResultRepo.gettestResultslist(AssesmentId);
		Set<ResultOfAssessment> resultAssessmentModelSet = new HashSet<ResultOfAssessment>();
		for (TestResult result : testResultslist) {
			ResultOfAssessment resultAssessment = new ResultOfAssessment();
			resultAssessment.setAssessmentId(result.getAssessmentId());
			resultAssessment
					.setAssessmentTitle(assessRepo.getReferenceById(result.getAssessmentId()).getAssessmentTitle());
			resultAssessment.setMaxMarks(result.getMaxMarks());
			resultAssessment
					.setNumberOfQuestions(assessRepo.getReferenceById(result.getAssessmentId()).getNumberOfQuestions());
			resultAssessment.setObtainedMarks(result.getMarksObtained());
			resultAssessment.setUserId(result.getUserId());
			resultAssessment.setUserName(userRepo.getReferenceById(result.getUserId()).getFirstName());
			resultAssessmentModelSet.add(resultAssessment);
		}
		return resultAssessmentModelSet;
	}

	@Override
	public SuccessMessage addGroupOfAssessments(AssessmentGrouDataSent assessmentGroupDataSent) {
		try {
			Integer groupCount = this
					.getCountOfAssessmentGroupByGroupName(assessmentGroupDataSent.getGroupName().toUpperCase());

			List<Assessment> selectedAssessments = new ArrayList<>();

			for (Integer assessId : assessmentGroupDataSent.getSelectedAssessmentIds()) {
				Long assessmentId = Long.valueOf(assessId);
				Assessment assessment = this.getAssessment(assessmentId);
				selectedAssessments.add(assessment);
			}

			if (groupCount == 0) {
				AssessmentGroup assessGroup = new AssessmentGroup();
				assessGroup.setGroupName(assessmentGroupDataSent.getGroupName().toUpperCase());
				AssessmentGroup savedAssessGroup = assessGroupRepo.save(assessGroup);

				List<AssessmentGroupAssessment> assessGroupAssessList = new ArrayList<AssessmentGroupAssessment>();

				selectedAssessments.stream().forEach((assessment) -> {
					AssessmentGroupAssessment assessmentGroupAssessment = new AssessmentGroupAssessment();
					assessmentGroupAssessment.setAssessmentGroup(savedAssessGroup);
					assessmentGroupAssessment.setAssessment(assessment);
					assessGroupAssessList.add(assessmentGroupAssessment);
				});

				savedAssessGroup.setAssessmentGroupAssessment(assessGroupAssessList);
				assessGroupRepo.save(savedAssessGroup);

				return new SuccessMessage("Assessment group saved successfully");
			} else {

				AssessmentGroup assessGroup = assessGroupRepo
						.findByNameWithAssessments(assessmentGroupDataSent.getGroupName());

				List<AssessmentGroupAssessment> groupAssessments = assessGroup.getAssessmentGroupAssessment();

				// Create a list of assessments to be deleted
				List<AssessmentGroupAssessment> assessmentsToBeDeleted = groupAssessments.stream()
						.filter(aga -> !selectedAssessments.contains(aga.getAssessment())).collect(Collectors.toList());

				if (assessmentsToBeDeleted.size() != 0) {
					assessmentsToBeDeleted.forEach((aga) -> {
						assessGroupRepo
								.deleteAssessmentGroupAssessmentByAssessGroupAssessId(aga.getAssessGroupAssessId());
					});
				}

				// Create a list of assessments to be added
				List<AssessmentGroupAssessment> assessmentsToBeAdded = selectedAssessments.stream()
						.filter(selectedAssessment -> groupAssessments.stream()
								.noneMatch(aga -> aga.getAssessment().equals(selectedAssessment)))
						.map(selectedAssessment -> {
							AssessmentGroupAssessment aga = new AssessmentGroupAssessment();
							aga.setAssessment(selectedAssessment);
							aga.setAssessmentGroup(assessGroup); // Set the assessment group
							return aga;
						}).collect(Collectors.toList());

				if (assessmentsToBeAdded.size() != 0) {
					assessGroup.setAssessmentGroupAssessment(assessmentsToBeAdded);
					assessGroupRepo.save(assessGroup);
				}

				if (assessmentsToBeDeleted.size() != 0) {
					if (assessmentsToBeAdded.size() != 0) {
						return new SuccessMessage("Assessment group edited successfully. "
								+ assessmentsToBeDeleted.size() + " assessments removed, " + assessmentsToBeAdded.size()
								+ " assessments added.");
					} else {
						return new SuccessMessage("Assessment group edited successfully. "
								+ assessmentsToBeDeleted.size() + " assessments removed.");
					}

				} else {
					if (assessmentsToBeAdded.size() != 0) {
						return new SuccessMessage("Assessment group edited successfully. " + assessmentsToBeAdded.size()
								+ " assessments added.");
					} else {
						return new SuccessMessage("Assessment group already exists, no changes made.");
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return new SuccessMessage("Failed to save assessment group");
		}
	}

	private Integer getCountOfAssessmentGroupByGroupName(String groupName) {
		return assessGroupRepo.getCountOfAssessmentGroupByGroupName(groupName);
	}

	@Override
	public List<AssessmentGroupDataModel> getAssessmentGroups() {
		Set<AssessmentGroup> assessmentGroup = assessGroupRepo.findAllWithAssessments();
		List<AssessmentGroupDataModel> assessmentGroupDataModel = new ArrayList<AssessmentGroupDataModel>();

		for (AssessmentGroup ag : assessmentGroup) {
			AssessmentGroupDataModel agDataModel = new AssessmentGroupDataModel();
			agDataModel.setGroupId(ag.getGroupId());
			agDataModel.setGroupName(ag.getGroupName());
			List<Assessment> agdmAssessmentList = new ArrayList<Assessment>();
			for (AssessmentGroupAssessment aga : ag.getAssessmentGroupAssessment()) {
				Assessment assessment = aga.getAssessment();
				agdmAssessmentList.add(assessment);
			}
			agDataModel.setAssessmentList(agdmAssessmentList);
			assessmentGroupDataModel.add(agDataModel);
		}
		assessmentGroupDataModel.stream().forEach(agdm -> System.out.println(agdm));

		return assessmentGroupDataModel;
	}

	@Override
	public SuccessMessage deleteAssessmentGroups(AssessmentGroupDataModel assessGroupData) {
//		return assessGroupRepo.delete(null);
		return null;
	}

}
