import { environment } from './../../../environments/environment';
import { User } from './../../model/user';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent {

  constructor(private http:HttpClient){}

  username:string="";
  password:string="";

  user={} as User;
  // user1 !:User;    Ways of Creating Object
  //user2=new User;

  private readonly minLength = 8;
  private readonly uppercaseRegex = /[A-Z]/;
  private readonly lowercaseRegex = /[a-z]/;
  private readonly numberRegex = /\d/;
  private readonly specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  validatePassword()
  {
    if (this.password.length < this.minLength)
    {
      return false;
    }
    if (!this.uppercaseRegex.test(this.password))
    {
      return false;
    }
    if (!this.lowercaseRegex.test(this.password))
    {
      return false;
    }
    if (!this.numberRegex.test(this.password))
    {
      return false;
    }
    if (!this.specialCharRegex.test(this.password))
    {
      return false;
    }
    return true;
  }

  isEmailInvalid() {
    // Validate email length and format
    if (this.user.emailId.length > 0 && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.emailId) || this.user.emailId.indexOf('@') === -1)) {
      return true;
    }
    return false;
  }


  // isPhoneNumberInvalid() {
  //   // Validate phone number length
  //   if (this.user.contactNumber.length > 0 && this.user.contactNumber.length !== 10) {
  //     return true;
  //   }
  //   return false;
  // }

  registerUsers()
  {
    if(!this.isEmailInvalid())
    {
      if(this.validatePassword())
      {
        //server call
        this.http.post(environment.url+'login/registerUsers'+this.username+'and'+this.password,this.user).subscribe(
          (data:any)=>{
            //response logic
            if(data==false)
            {
              window.alert("Username Already Exist :(");
            }
            else
            {
              window.alert("Registration Successful");
              this.user=new User;
              this.username=undefined;
              this.password=undefined;
            }
          }
        );
      }
    else
    {
      window.alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character");
    }
    }
    else
    {
      window.alert("Please Enter Valid Email Address !!")
    }
  }

  isDisable()
  {
    if(this.username=="" || this.password=="" || this.user.firstName=="" || this.user.lastName==""
    || this.user.emailId=="" || this.user.address=="" || this.user.contactNum==null || this.user.dateOfBirth==undefined )
      return true;
    else
      return false;
  }

}
