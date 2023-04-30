import { UserserviceService } from './../../services/userservice.service';
import { User } from './../../model/user';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './../../app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-superadmindashboard',
  templateUrl: './superadmindashboard.component.html',
  styleUrls: ['./superadmindashboard.component.css']
})
export class SuperadmindashboardComponent {

  constructor(private http:HttpClient, private logdash:AppComponent,public service:UserserviceService){}
  logout()
  {
    if(window.confirm("Do You Want To Logout !!!")==true)
    {
      this.logdash.whoseLogin=0;
    }
  }

  allUnapprovedUsers:User[]=[];
  isShow=0;
  getUnApproveUsers()
  {
    this.isShow=1;
    //Server Call to get All Unaproved Users
    this.http.get(environment.url+'superadmin/getAllUnaprovedUsers').subscribe(
      (data:any)=>
      {
        if(data==null)
        {
          window.alert("No User Pending");
        }
        else
        {
          this.allUnapprovedUsers=data;
          //console.log(this.allUnapprovedUsers);
        }
      }
    );
  }

  backToMenu()
  {
    this.isShow=0;
  }

  selectedRole:string="";
  approveUsers(userId:number)
  {
    //console.log(this.selectedRole);
    // Server Call to Set The Role to User
    this.http.get(environment.url+'superadmin/setUserRole'+this.selectedRole+'and'+userId).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("Failed To Approve !!!");
        }
        else
        {
          if(window.confirm("Approve This User")==true)
          {
            window.alert("Approved Successfully");
            for(let i=0; i<this.allUnapprovedUsers.length; i++)
            {
              if(this.allUnapprovedUsers[i].id==userId)
              {
                this.allUnapprovedUsers.splice(i,1);
                break;
              }
            }
          }
        }
      }
    );
  }

  changeRole(event:any)
  {
    this.selectedRole=event.target.value;
    //this.disable=1;
  }
  isDisable()
  {
    if(this.selectedRole=="")
      return true;
    else
      return false;
  }

  allApprovedUsers:User[]=[];
  getAllApprovedUser()
  {
    this.isShow=2;
    //Server call to get All Approved Users
    this.http.get(environment.url+'superadmin/getAllApprovedUsers').subscribe(
      (data:any)=>
      {
        if(data==null)
        {
          window.alert("Failed to Load Users");
        }
        else
        {
          this.allApprovedUsers=data;
        }
      }
    );
  }
  selectedRole2:string="";
  changeRole2(event:any)
  {
    this.selectedRole2=event.target.value;
    //this.disable=1;
  }

  changeUserRole(userId:number)
  {
    //Server Call to Change the UserRole
    this.http.get(environment.url+'superadmin/changeUserRole'+this.selectedRole2+'and'+userId).subscribe(
      (data:any)=>
      {
        if(data==-1)
        {
          window.alert("Failed To Modify !!!");
        }
        else
        {
          if(window.confirm("Modify This User")==true)
          {
            window.alert("Modified Successfully");
            //Show Updated TopicName to UI
            for(let i=0; i<this.allApprovedUsers.length; i++)
            {
              if(this.allApprovedUsers[i].id==userId)
              {
                this.allApprovedUsers[i].userRole=data;
                break;
              }
            }
          }
        }
      }
    );
  }

  deactivateUser(userId:number)
  {
    //Server Call to Deactivate User
    this.http.delete(environment.url+'superadmin/deactivateUser'+userId).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("Failed to Deactivate User :(");
        }
        else
        {
          if(window.confirm("Do You Want to Deactivate User")==true)
          {
            window.alert("User Marked Deactivated!!");
            for(let i=0; i<this.allApprovedUsers.length; i++)
            {
              if(this.allApprovedUsers[i].id==userId)
              {
                this.allApprovedUsers.splice(i,1);
                break;
              }
            }
          }
        }
      }
    );
  }

  allDeactiveUsers:User[]=[];
  getAllDeactiveUsers()
  {
    this.isShow=3;
    //Server Call to Get all Deactive Users
    this.http.get(environment.url+'superadmin/getAllDeactiveUsers').subscribe(
      (data:any)=>
      {
        if(data==null)
        {
          window.alert("No Deactive User Found !!");
        }
        else
        {
          this.allDeactiveUsers=data;
        }
      }
    );
  }

  reactivateUser(userId:number)
  {
    //Server call to Reactivate User Account and set UserRole To 0
    this.http.get(environment.url+'superadmin/reactivateUser'+userId).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("Unable To Re-Active User !!");
        }
        else
        {
          if(window.confirm("Do You Want to Re-Active User !!")==true)
          {
            window.alert("User Account Activated !!");
            for(let i=0; i<this.allDeactiveUsers.length; i++)
            {
              if(this.allDeactiveUsers[i].id==userId)
              {
                this.allDeactiveUsers.splice(i,1);
                break;
              }
            }
          }
        }
      }
    );
  }

}
