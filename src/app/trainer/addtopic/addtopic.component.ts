import { Topic } from './../../model/topic';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.css']
})
export class AddtopicComponent {

  constructor(private http:HttpClient){}

  checkTopicAddorNot(topicName:string)
  {
    let cnt:number=0;
    for(let i=0; i<this.allTopicList.length;i++)
    {
      if(this.allTopicList[i].topicName==topicName)
      {
        window.alert("Topic Already Present");
        return ++cnt;
      }
    }
    return 0;
  }

  enteredTopic:string="";
  //Method To Disable the AddTopic Button
  isDisable()
  {
    if(this.enteredTopic=="")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  addTopic(topicName:string)
  {
    let cnt=this.checkTopicAddorNot(topicName);

    if(cnt==0)
    {
      //Server Call To Add Topic
      this.http.get(environment.url+'trainer/addTopic'+topicName).subscribe(
        (data:any)=>
        {
          if(data==null)
          {
            window.alert("Failed To Add Topic");
          }
          else
          {
            if(window.confirm("Do You Want To Add Topic")==true)
            {
              window.alert("Topic Added Successfully");
              //let mytopic:Topic=new Topic();
              //mytopic.topicName=topicName;
              this.allTopicList.push(data);
              this.enteredTopic="";
            }
          }
        }
      );
    }
  }

  isShowAllTopic=0;
  allTopicList:Topic[]=[];
  showAllTopic()
  {
    //Server Call to Get All Topics
    this.http.get(environment.url+'trainer/getAllTopicList').subscribe(
      (data:any)=>
      {
        if(data==null)
        {
          window.alert("Failed to Load Topics");
        }
        else
        {
          this.allTopicList=data;
          this.isShowAllTopic=1;
        }
      }
    );
  }

  isUpdate=0;
  topicId=0;
  action(num:number)
  {
    this.isUpdate=0;
    this.topicId=num;
  }

  delete(topicId:number)
  {
    //Server Call to Delete Topic from DB
    this.http.delete(environment.url+'trainer/deleteTopic'+topicId).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("Topic Not Deleted");
        }
        else
        {
          if(window.confirm("Do You Want To Delete Topic?")==true)
          {
            window.alert("Topic Deleted Successfully");
            for(let i=0; i<this.allTopicList.length; i++)
            {
              if(this.allTopicList[i].id==topicId)
              {
                this.allTopicList.splice(i,1);
                break;
              }
            }
          }
        }
      }
    );
  }

  updatedTopicName:string="";
  updateTopicName(topicId:number)
  {
    let cnt=this.checkTopicAddorNot(this.updatedTopicName);
    if(cnt==0)
    {
      //Server Call top Update Topic name
      this.http.get(environment.url+'trainer/updateTopicName'+this.updatedTopicName+'and'+topicId).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("TopicName not Updated");
        }
        else
        {
          window.alert("TopicName Updated Successfully");
          //Show Updated TopicName to UI
          for(let i=0; i<this.allTopicList.length; i++)
          {
            if(this.allTopicList[i].id==topicId)
            {
              this.allTopicList[i].topicName=this.updatedTopicName;
              break;
            }
          }
          this.isUpdate=1;
        }
      }
    );
    }
  }
}
