import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { LoadtestComponent } from './loadtest/loadtest.component';



@NgModule({
  declarations: [
    StudentdashboardComponent,
    LoadtestComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    StudentdashboardComponent
  ]
})
export class StudentModule { }
