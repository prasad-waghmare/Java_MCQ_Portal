import { UserserviceService } from './../../services/userservice.service';
import { AppComponent } from './../../app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent {

  constructor(private logdash:AppComponent,public service:UserserviceService){}

  isShow=0;
  whatToShow(num:number)
  {
    this.isShow=num;
  }

  logout()
  {
    if(window.confirm("Do You Want To Logout ?")==true)
    {
      this.logdash.whoseLogin=0;
    }
  }
}
