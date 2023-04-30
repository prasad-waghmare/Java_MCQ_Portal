import { Question } from './../../model/question';
import { environment } from './../../../environments/environment';
import { Topic } from './../../model/topic';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent {

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
  question:Question=new Question();

  addQuestion()
  {
    //Server Call to Add Question in DB
    this.http.post(environment.url+'trainer/addQuestion'+this.selectedTopic,this.question).subscribe(
      (data:any)=>
      {
        if(!data)
        {
          window.alert("Question Not Added");
        }
        else
        {
          if(window.confirm("Do You Want To Add Question?")==true)
          {
            window.alert("Question Added Successfully");
            this.question=new Question();
          }
        }
      }
    );
  }

  howToDisable()
  {
    if(this.question.optionA==undefined || this.question.optionB==undefined || this.question.optionC==undefined || this.question.optionD==undefined || this.question.correctAns==undefined)
    {
      return true;
    }
    else
    {
      return false;
    }
  }




}
