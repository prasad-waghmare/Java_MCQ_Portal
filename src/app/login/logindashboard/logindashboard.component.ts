import { Component } from '@angular/core';

@Component({
  selector: 'app-logindashboard',
  templateUrl: './logindashboard.component.html',
  styleUrls: ['./logindashboard.component.css']
})
export class LogindashboardComponent {

  isShow=0;
  whatToShow(num:number)
  {
    this.isShow=num;
  }

}
