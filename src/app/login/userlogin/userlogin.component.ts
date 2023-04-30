import { UserserviceService } from './../../services/userservice.service';
import { AppComponent } from './../../app.component';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Userspecificdata } from 'src/app/model/userspecificdata';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {

  userSpecificData:Userspecificdata[]=[];

  constructor(private http:HttpClient,private logdash:AppComponent,public service:UserserviceService){}

  //whoseLogin=0;

  username:string="";
  password:string="";
  login()
  {
    //console.log(username+" "+password);

    //server call for Authenticating User
    this.http.get(environment.url+'login/loginUser'+this.username+'and'+this.password).subscribe(
      (data:any)=>{
        if (data == -1)
        {
          window.alert("Authentication Failed");
          this.username=undefined;
          this.password=undefined;
        }
        else if (data == 1)
        {
          window.alert("User Not Found");
        }
        else if (data == 2) {
          window.alert("User Not Found");
        }
        else if (data == 3) {
          window.alert("Password is Incorrect");
        }
        else if (data == 4)
        {
          window.alert("Login Successful !! :)");

          //Server call to get User Role
          this.http.get(environment.url+'login/getUserRole'+this.username).subscribe(
            (data:any)=>
            {
              if(data==-1)
              {
                window.alert("User Not Found!!! :(");
              }
              else if(data==0)
              {
                window.alert("User is Not Approved Yet :(");
              }
              else
              {
                this.logdash.whoseLogin=data;
              }
            }
          );

          //Server Call to Get the User Data to Welcome User with full name
          this.http.get(environment.url+'login/getUserSpecificData'+this.username).subscribe(
            (data:any)=>
            {
              if(data==null)
              {
                window.alert("Failed to Load User Details :(");
              }
              else
              {
                this.userSpecificData=data;
                this.service.setData(this.userSpecificData[0]);
              }
            }
          );
        }
      }
    );
  }

  isDisable()
  {
    if(this.username=="" || this.password=="")
      return true;
    else
      return false;
  }

}
