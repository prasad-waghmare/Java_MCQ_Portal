package com.example.demo.Entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity@Data@AllArgsConstructor@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String firstName;
	private String lastName;
	private String emailId;
	private long contactNum;
	private String address;
	private Date dateOfBirth;
	private String username;
	private String password;
	private Date userCreateDate;
	private int userRole; //1-Admin	2-Student 3-superAdmin
	private int activeUser;	//0-Active	1-Deleted
}
