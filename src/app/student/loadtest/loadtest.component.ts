import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Question } from './../../model/question';
import { Component } from '@angular/core';
import { StudentdashboardComponent } from '../studentdashboard/studentdashboard.component';

@Component({
  selector: 'app-loadtest',
  templateUrl: './loadtest.component.html',
  styleUrls: ['./loadtest.component.css']
})
export class LoadtestComponent {

  randomTestQuestion:Question[]=[];
  constructor(private http:HttpClient,private studentDash:StudentdashboardComponent){
    //this.getAllTestQuestion();
  }

  oneQuestion:Question;
  isLoadTest:number=0;
  numberOfQuestions:number;
  getAllTestQuestion()
  {
    this.countOfCorrectAns=0
    this.questionSerialNum=1;
    this.randomTestQuestion=[];
    this.isShowSubmit=0;
    //Server Call To Get Random Questions for Test
    this.http.get(environment.url+'student/getAllRandomTestQuestion'+this.numberOfQuestions).subscribe(
      (data:any)=>
      {
        if(data==null)
        {
          window.alert("Failed To Load Test...Please Reduce Questions Count");
          this.numberOfQuestions=null;
          this.studentDash.isShow=0;
        }
        else
        {
          this.numberOfQuestions=null;
          this.randomTestQuestion=data;
          this.isLoadTest=1;
          //console.log(data);
          this.oneQuestion=this.randomTestQuestion[0];
        }
      }
    );
  }

  questionSerialNum=1;
  isShowSubmit=0;
  userAns:string="";
  countOfCorrectAns=0;
  showNextQuestion(questionId:number)
  {
    if(this.oneQuestion.correctAns==this.userAns)
    {
      this.countOfCorrectAns++;
    }
    this.userAns="";
    if(this.questionSerialNum<this.randomTestQuestion.length)
    {
      this.oneQuestion=new Question();
      this.oneQuestion=this.randomTestQuestion[this.questionSerialNum++];
    }
    else
    {
      window.alert("Please Submit Test");
      this.isShowSubmit=1;
    }
  }

  resultSubmit()
  {
    window.alert("You Solved "+(this.countOfCorrectAns+" Out of "+this.randomTestQuestion.length)+" Questions Correctly");
    //this.isLoadTest=0;
    this.studentDash.isShow=0;
  }
  isDisable()
  {
    if(this.numberOfQuestions==null)
      return true;
    else
      return false;
  }

}
