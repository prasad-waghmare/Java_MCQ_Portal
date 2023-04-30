package com.example.demo.Entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity@Data@AllArgsConstructor@NoArgsConstructor
public class Question {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String shortName;
	private String questionDetail;
	private String optionA;
	private String optionB;
	private String optionC;
	private String optionD;
	private String correctAns;
	private String reportQuestion;
	private Date creationDate;
	private int isDeleteQuestion;	//0-Active 1-Deleted
	
	@ManyToOne
	User whoAddedQuestion;
}
