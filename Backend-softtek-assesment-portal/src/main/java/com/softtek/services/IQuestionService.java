package com.softtek.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import com.softtek.entities.Question;

public interface IQuestionService {
	public ByteArrayInputStream getAllQuestions(long AssesmentId) throws IOException;
}
