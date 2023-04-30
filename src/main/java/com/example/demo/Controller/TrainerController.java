package com.example.demo.Controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Question;
import com.example.demo.Entity.Topic;
import com.example.demo.Repository.QuestionRepo;
import com.example.demo.Repository.TopicRepo;

@RestController
@CrossOrigin
@RequestMapping("trainer")
public class TrainerController {
	
	@Autowired
	TopicRepo topicRepo;
	
	@Autowired
	QuestionRepo questionRepo;
	
	@PostMapping("updateQuestion")
	public boolean updateQuestion(@RequestBody Question updatedQuestion)
	{
		try
		{
			int id = updatedQuestion.getId();
			
			//Update Question in QuestionRepo
			Question question = questionRepo.findById(id).get();
			question.setShortName(updatedQuestion.getShortName());
			question.setQuestionDetail(updatedQuestion.getQuestionDetail());
			question.setOptionA(updatedQuestion.getOptionA());
			question.setOptionB(updatedQuestion.getOptionB());
			question.setOptionC(updatedQuestion.getOptionC());
			question.setOptionD(updatedQuestion.getOptionD());
			question.setCorrectAns(updatedQuestion.getCorrectAns());
			question.setCreationDate(new Date());
			questionRepo.save(question);
			
			return true;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	
	@GetMapping("getOneQuestionDetails{questionId}")
	public Question getOneQuestionDetails(@PathVariable int questionId)
	{
		try
		{
			return questionRepo.findById(questionId).get();
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return null;
		}
	}
	
	@DeleteMapping("deleteQuestion{questionId}and{selectedTopic}")
	public boolean deleteQuestion(@PathVariable int questionId,@PathVariable String selectedTopic)
	{
		try
		{
			//Set Question isDelete=1(not Active)
			Question question = questionRepo.findById(questionId).get();
			question.setIsDeleteQuestion(1);
			questionRepo.save(question);
			
			//Find Topic and get list of questions then remove specific question
//			Topic topic = topicRepo.findByTopicName(selectedTopic);
//			List<Question> questions = topic.getQuestions();
//			questions.remove(questions.indexOf(question));
//			topicRepo.save(topic);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@GetMapping("getAllQuestionsOfTopic{topicName}")
	public List<Question> getAllQuestionsOfTopic(@PathVariable String topicName)
	{
		try
		{
			Topic topic = topicRepo.findByTopicName(topicName);
			return topic.getQuestions();
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@PostMapping("addQuestion{selectedTopic}")
	public boolean addQuestion(@PathVariable String selectedTopic,@RequestBody Question question)
	{
		try
		{
			question.setCreationDate(new Date());
			questionRepo.save(question);
			
			Topic topic = topicRepo.findByTopicName(selectedTopic);
			List<Question> questions = topic.getQuestions();
			questions.add(question);
			topicRepo.save(topic);
			return true;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	
	@GetMapping("updateTopicName{topicName}and{topicId}")
	public boolean updatedTopicName(@PathVariable String topicName,@PathVariable int topicId)
	{
		try
		{
			Topic topic = topicRepo.findById(topicId).get();
			topic.setTopicName(topicName);
			topicRepo.save(topic);
			return true;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	
	@DeleteMapping("deleteTopic{topicId}")
	public boolean deleteTopic(@PathVariable int topicId)
	{
		try
		{
			Topic topic = topicRepo.findById(topicId).get();
			topic.setIsDeleteTopic(1);
			topicRepo.save(topic);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@GetMapping("getAllTopicList")
	public List<Topic> getAllTopicList()
	{
		try
		{
			return topicRepo.getAllActiveTopic();
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@GetMapping("addTopic{topicname}")
	public Topic addTopic(@PathVariable String topicname)
	{
		try
		{
			Topic topic=new Topic();
			topic.setTopicName(topicname);
			topic.setCreationDate(new Date());
			topicRepo.save(topic);
			return topic;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return null;
		}
	}

}
