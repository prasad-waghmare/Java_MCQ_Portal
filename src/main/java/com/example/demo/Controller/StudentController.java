package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Question;
import com.example.demo.Repository.QuestionRepo;

@RestController
@CrossOrigin
@RequestMapping("student")
public class StudentController {

	@Autowired
	QuestionRepo questionRepo;
	
	@GetMapping("getAllRandomTestQuestion{numberOfQuestions}")
	public List<Question> getAllRandomTestQuestion(@PathVariable int numberOfQuestions)
	{
		try
		{
			int count = questionRepo.getCountOfAvailableQuestions();
			if(numberOfQuestions<count)
				return questionRepo.getRandomTestQuestion(numberOfQuestions);
			else
				return null;
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
