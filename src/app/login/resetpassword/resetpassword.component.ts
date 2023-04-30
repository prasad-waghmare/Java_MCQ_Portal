import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  constructor(private http:HttpClient){}

  private readonly minLength = 8;
  private readonly uppercaseRegex = /[A-Z]/;
  private readonly lowercaseRegex = /[a-z]/;
  private readonly numberRegex = /\d/;
  private readonly specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  validatePassword()
  {
    if (this.newPassword.length < this.minLength)
    {
      return false;
    }
    if (!this.uppercaseRegex.test(this.newPassword))
    {
      return false;
    }
    if (!this.lowercaseRegex.test(this.newPassword))
    {
      return false;
    }
    if (!this.numberRegex.test(this.newPassword))
    {
      return false;
    }
    if (!this.specialCharRegex.test(this.newPassword))
    {
      return false;
    }
    return true;
  }

  username:string="";
  password:string="";
  setPassword=0;
  isDisable()
  {
    if (this.username == "")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  verifyUsername()
  {
    //Server Call to Check Username available or Not
    this.http.get(environment.url+'login/verifyUsername'+this.username).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("UserName not Found!! :(");
        }
        else
        {
          window.alert("Proceed Further to Reset PassWord :)");
          this.setPassword=1;
        }
      }
    );
  }

  isDisable1()
  {
    if (this.password == "")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  verifyPassword()
  {
    //Server Call to Check Password Correct or Not
    this.http.get(environment.url+'login/verifyPassword'+this.username+'and'+this.password).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("Enter Valid Password!! : (");
        }
        else
        {
          window.alert("Enter New Password!! : )");
          this.setPassword=2;
        }
      }
    );
  }

  isDisable2()
  {
    if (this.newPassword == "" || this.confirmNewPassword=="")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  newPassword:string="";
  confirmNewPassword:string="";
  resetPassword()
  {
    if(this.validatePassword())
    {
      if(this.newPassword==this.confirmNewPassword)
      {
        //Server Call to Reset the Password
        this.http.get(environment.url+'login/setNewPassword'+this.username+'and'+this.newPassword+'and'+this.confirmNewPassword).subscribe(
          (data:any)=>
          {
            if(!data)
            {
              window.alert("Failed to Reset Password :(");
            }
            else
            {
              if(window.confirm("Do You Want To Change Password !!!")==true)
              {
                window.alert("Password Succesfully Reset :)");
                this.setPassword=0;
                this.username="";
                this.password="";
                this.newPassword="";
                this.confirmNewPassword="";
              }
            }
          }
        );
      }
      else
      {
        window.alert("Entered Password Does Not Matched")
      }
    }
    else
    {
      window.alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character");
    }

  }
}
