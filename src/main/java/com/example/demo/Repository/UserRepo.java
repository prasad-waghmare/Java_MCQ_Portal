package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entity.User;
import com.example.demo.Service.UserSpecificData;

public interface UserRepo extends JpaRepository<User, Integer>
{
	int countByUsername(String username);
	
	@Query(value = "SELECT * FROM user\r\n"
			+ "where active_user=0 and user_role!=0 and username=?1",nativeQuery = true)
	User findByUsername(String username);
	
	//List of UnApproved Users to Assign the role 
	@Query(value = "SELECT * FROM user\r\n"
			+ "where user_role=0 and active_user=0",nativeQuery = true)
	List<User> getAllUnapprovedUsers();
	
	//UserData Send to UI for Welcome Name Using Projection
	@Query(value = "select first_name as firstName,last_name as lastName \r\n"
			+ "from user where username=?1",nativeQuery = true)
	List<UserSpecificData> getUserSpecificData(String username);
	
	//List of Approved Users to Change the Role 
	@Query(value = "SELECT * FROM user\r\n"
			+ "where user_role not in (0,3) and active_user=0",nativeQuery = true)
	List<User> getAllApprovedUsers();
	
	//List of Deactive Users
	@Query(value = "SELECT * FROM user\r\n"
			+ "where active_user=1",nativeQuery = true)
	List<User> getAllDeactiveUsers();
}
