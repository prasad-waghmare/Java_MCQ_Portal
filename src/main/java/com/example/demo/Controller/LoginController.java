package com.example.demo.Controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepo;
import com.example.demo.Service.UserSpecificData;

@RestController
@CrossOrigin
@RequestMapping("login")
public class LoginController {
	
	@Autowired
	UserRepo userRepo;
	
	@GetMapping("getUserSpecificData{username}")
	public List<UserSpecificData> getUserSpecificData(@PathVariable String username)
	{
		try
		{
			List<UserSpecificData> userSpecificData = userRepo.getUserSpecificData(username);
			return userSpecificData;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return null;
		}
	}
	
	@GetMapping("setNewPassword{username}and{newPassword}and{confirmNewPassword}")
	public boolean setNewPassword(@PathVariable String username,@PathVariable String newPassword,@PathVariable String confirmNewPassword)
	{
		try
		{
			if(newPassword.equals(confirmNewPassword))
			{
				User user = userRepo.findByUsername(username);
				user.setPassword(confirmNewPassword);
				userRepo.save(user);
				return true;
			}
			else
			{
				return false;
			}
			
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	
	@GetMapping("verifyPassword{username}and{password}")
	public boolean verifyPassword(@PathVariable String username, @PathVariable String password)
	{
		try
		{
			User user = userRepo.findByUsername(username);
			if(password.equals(user.getPassword()))
				return true;
			return false;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	
	@GetMapping("verifyUsername{username}")
	public boolean verifyUsername(@PathVariable String username)
	{
		try
		{
			int countByUsername = userRepo.countByUsername(username);
			if(countByUsername==1)
				return true;
			else
				return false;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	
	@GetMapping("getUserRole{UIusername}")
	public int getUserRole(@PathVariable String UIusername)
	{
		try
		{
			User user = userRepo.findByUsername(UIusername);
			return user.getUserRole();
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return -1;
		}
	}
	
	@GetMapping("loginUser{UIusername}and{UIpassword}")
	public int loginUser(@PathVariable String UIusername,@PathVariable String UIpassword)
	{
		try
		{
			//username correct check already present in db
			int countByUser = userRepo.countByUsername(UIusername);
			if(countByUser>0) 
			{
				User dbuser = userRepo.findByUsername(UIusername);
				if(dbuser.getUsername().equals(UIusername))
				{
					if(UIpassword.equals(dbuser.getPassword()))
						return 4;
					else
						return 3;
				}
				return 2;
			}
			else
			{
				return 1;
			}
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return -1;
		}
	}
	
	@PostMapping("registerUsers{username}and{password}")
	public boolean registerUsers(@PathVariable String username,@PathVariable String password,@RequestBody User user)
	{
		try
		{
			user.setUsername(username);
			user.setPassword(password);
			user.setUserCreateDate(new Date());
			int countByUsername = userRepo.countByUsername(username);
			if(countByUsername==0)
				userRepo.save(user);
			else
				return false;
			return true;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
	}
	

}
