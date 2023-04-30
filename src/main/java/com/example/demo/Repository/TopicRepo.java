package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entity.Topic;

public interface TopicRepo extends JpaRepository<Topic, Integer>{
	
	@Query(value = "SELECT * FROM topic\r\n"
			+ "where is_delete_topic=0", nativeQuery = true)
	List<Topic> getAllActiveTopic();
	
	@Query(value = "SELECT * FROM topic\r\n"
			+ "where is_delete_topic=0 and topic_name=?1",nativeQuery = true)
	Topic findByTopicName(String topicName);
	
	@Query(value = "SELECT topic_id FROM topic_questions\r\n"
			+ "where questions_id=?1",nativeQuery = true)
	Topic findTopicByQuestionId(int questionId);

}
