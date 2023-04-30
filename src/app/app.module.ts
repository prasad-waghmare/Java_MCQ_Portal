import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { StudentModule } from './student/student.module';
import { TrainerModule } from './trainer/trainer.module';
import { SuperadminModule } from './superadmin/superadmin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    StudentModule,
    TrainerModule,
    SuperadminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
