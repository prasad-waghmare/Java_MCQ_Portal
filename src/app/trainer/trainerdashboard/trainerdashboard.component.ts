import { UserserviceService } from './../../services/userservice.service';
import { AppComponent } from './../../app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trainerdashboard',
  templateUrl: './trainerdashboard.component.html',
  styleUrls: ['./trainerdashboard.component.css']
})
export class TrainerdashboardComponent {

  constructor(private logdash:AppComponent,public service:UserserviceService){}

  logout()
  {
    if(window.confirm("Do You Want To Logout ?")==true)
    {
      this.logdash.whoseLogin=0;
    }
  }

  isShow=0;
  whatToShow(num:number)
  {
    this.isShow=num;
  }
}
