import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerdashboardComponent } from './trainerdashboard/trainerdashboard.component';
import { AddtopicComponent } from './addtopic/addtopic.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { ShowallquestionComponent } from './showallquestion/showallquestion.component';



@NgModule({
  declarations: [
    TrainerdashboardComponent,
    AddtopicComponent,
    AddquestionComponent,
    ShowallquestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TrainerdashboardComponent
  ]
})
export class TrainerModule { }
