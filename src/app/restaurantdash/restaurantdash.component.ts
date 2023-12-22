import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurantdash',
  templateUrl: './restaurantdash.component.html',
  styleUrls: ['./restaurantdash.component.css'],
})
export class RestaurantdashComponent implements OnInit {
  formValue!: FormGroup;
  resturantmodelobj: RestaurantData = new RestaurantData();
  allRestaurantData: any;
showAdd!: boolean;
showbtn!:boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }

  clickAddrestro(){
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn=false;
  }

  //now subscrbiing our data whis is maped via service
  addRestro() {
    this.resturantmodelobj.name = this.formValue.value.name;
    this.resturantmodelobj.email = this.formValue.value.email;
    this.resturantmodelobj.mobile = this.formValue.value.mobile;
    this.resturantmodelobj.address = this.formValue.value.address;
    this.resturantmodelobj.services = this.formValue.value.services;

    this.api.postRestaurant(this.resturantmodelobj).subscribe(
      (res) => {
        console.log(res);
        alert('Restaurant Records Added Successfull ');
        //clear fill form data 0
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Something Wents Wrong');
      }
    );
  }

  //get all data
  getAllData() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res;
    });
  }

  //delete data
  deleteRecord(data:any ) {
    console.log("delete button click");
 this.api.deleteRestaurant(data.id).subscribe(res => {
      alert('Restaurant data is Deleted!!!');
      this.getAllData(); //data refresh
    });
  }

  onEditRecord(data:any){
    this.showAdd = false;
    this.showbtn=true;
   this.resturantmodelobj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
    
  }
  
  updateRestro(){
    this.resturantmodelobj.name = this.formValue.value.name;
    this.resturantmodelobj.email = this.formValue.value.email;
    this.resturantmodelobj.mobile = this.formValue.value.mobile;
    this.resturantmodelobj.address = this.formValue.value.address;
    this.resturantmodelobj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.resturantmodelobj,this.resturantmodelobj.id).subscribe(res=>{
      alert("Restraunt Records Update");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    })
  }
 
}
