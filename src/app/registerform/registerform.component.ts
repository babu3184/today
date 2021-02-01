import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from '../shared/country.service';
import { UserService } from '../shared/user.service';
import { Country } from '../model/country.model';
import { User } from '../model/user.model';
@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {
  formdata: any;
  countryList: Array<any>;
  state: Array<any>;
  constructor(public userservice: UserService,
              public countryservice: CountryService) { }

 url = 'https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png';


  ngOnInit(): void {
    this.getAllCountry();
  }
  
  onChange(event) {
    this.userservice.currentUser.address = event.target.value;
  }

  selectFile(event){
    if (event.target.files){
      const reader = new FileReader();
      reader. readAsDataURL(event.target.files[0]);
      reader. onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  getAllCountry(){
    this.countryservice.getAllCountry().subscribe(
       (data: Country[]) => {
         this.countryList = data;
    });
  }

  changeCountry(count) {
    this.state = this.countryList.find(con => con.country == count).states;
  }

  CreateAndUpdate(currentUser: User){
    console.log(currentUser);
    if(currentUser.id!= null){
      console.log('update');
      this.UpdateUser(currentUser);
    }else{
      console.log('Create');
      this.createUser(currentUser);
    }
  }

  createUser(user: User){
    this.userservice.createUser(user).subscribe();
  }
  UpdateUser(user: User){
  this.userservice.UpdateUser(user).subscribe();
}

}
