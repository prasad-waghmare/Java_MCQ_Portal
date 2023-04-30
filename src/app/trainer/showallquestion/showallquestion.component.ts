import { Question } from './../../model/question';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Topic } from './../../model/topic';
import { Component } from '@angular/core';

@Component({
  selector: 'app-showallquestion',
  templateUrl: './showallquestion.component.html',
  styleUrls: ['./showallquestion.component.css']
})
export class ShowallquestionComponent {

  AllTopicList:Topic[]=[];

  constructor(private http:HttpClient){

    this.http.get(environment.url+'trainer/getAllTopicList').subscribe(
      (data:any)=>
      {
        if(data==null)
        {
          window.alert("Data Not Fetched");
        }
        else
        {
          this.AllTopicList=data;
        }
      }
    );
  }

  selectedTopic:string="";
  allQuestionOfTopic:Question[]=[];
  selectTopic(event:any)
  {
    this.selectedTopic=event.target.value;
    //Server Call to Get All Questions Related to Selected Topic
    this.http.get(environment.url+'trainer/getAllQuestionsOfTopic'+this.selectedTopic).subscribe(
      (data:any)=>
      {
        if(data==null)
        {
          window.alert("Failed to Load Question...");
        }
        else
        {
          this.allQuestionOfTopic=data;
        }
      }
    );
  }

  deleteQuestion(questionId:number)
  {
    //Server call to Delete Topic On the basis of TopicId
    this.http.delete(environment.url+'trainer/deleteQuestion'+questionId+'and'+this.selectedTopic).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("Unable to Delete Question");
        }
        else
        {
          if(window.confirm("Do You Want to Delete Question !!")==true)
          {
            window.alert("Question Successfully Deleted !!!");
            //To Remove Question From UI itself
            for(let i=0; i<this.allQuestionOfTopic.length; i++)
            {
              if(this.allQuestionOfTopic[i].id==questionId)
              {
                this.allQuestionOfTopic.splice(i,1);
                break;
                //Splice will remove 1 element from question where index will match
              }
            }
          }
        }
      }
    );
  }

  showDetails:number=0;
  myQuestionDetail:Question=new Question();
  showDetailsOfQuestion(questionId:number)
  {
    this.showDetails=1;
    //Server call to get Details of Selected Question
    this.http.get(environment.url+'trainer/getOneQuestionDetails'+questionId).subscribe(
      (data:any)=>
      {
        if(data==null)
        {
          window.alert("Failed to Load Question");
        }
        else
        {
          this.myQuestionDetail=data;
        }
      }
    );
  }

  backToMenu()
  {
    this.showDetails=0;
  }

  updateDiv()
  {
    this.showDetails=2;
  }

  updateQuestion()
  {
    //Server Call to Update the Question
    this.http.post(environment.url+'trainer/updateQuestion',this.myQuestionDetail).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          alert("Failed to Update Question :(");
        }
        else
        {
          alert("Updated Successfully :)");
          //this.showDetails=0;   If You want to go to main Menu...UnComment This
        }
      }
    );
  }



}
