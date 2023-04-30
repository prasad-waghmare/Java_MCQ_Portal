import { Userspecificdata } from './../model/userspecificdata';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor() { }

  private user: Userspecificdata=new Userspecificdata();

  setData(localuser:Userspecificdata)
  {
    this.user=localuser;
    //console.log(this.user);
  }

  getData()
  {
    return this.user
  }
}
