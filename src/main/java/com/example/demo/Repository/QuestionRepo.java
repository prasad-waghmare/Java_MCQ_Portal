package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entity.Question;

public interface QuestionRepo extends JpaRepository<Question, Integer>{
	
	@Query(value = "SELECT * FROM question\r\n"
			+ "where is_delete_question=0", nativeQuery = true)
	List<Question> getAllActiveQuestions();
	
	@Query(value = "SELECT * FROM question order by rand() limit ?1",nativeQuery = true)
	List<Question> getRandomTestQuestion(int QuestionCount);
	
	@Query(value = "SELECT count(*) FROM question\r\n"
			+ "where is_delete_question=0",nativeQuery = true)
	int getCountOfAvailableQuestions();

}
