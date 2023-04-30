import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadmindashboardComponent } from './superadmindashboard/superadmindashboard.component';



@NgModule({
  declarations: [
    SuperadmindashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SuperadmindashboardComponent
  ]
})
export class SuperadminModule { }
