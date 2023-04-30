import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogindashboardComponent } from './logindashboard/logindashboard.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { FormsModule } from '@angular/forms';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';



@NgModule({
  declarations: [
    LogindashboardComponent,
    UserloginComponent,
    UserregistrationComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    LogindashboardComponent,
    UserloginComponent,
    UserregistrationComponent
  ]
})
export class LoginModule { }
