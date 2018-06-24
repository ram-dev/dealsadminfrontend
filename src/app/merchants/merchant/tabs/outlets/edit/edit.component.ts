import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OutletService } from '../../../../../@core/data/outlet.service';
import { Component, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-oultes-edit',
  templateUrl: './edit.component.html',  
  styleUrls: ['./edit.component.scss']  
})
export class OultelsEditComponent {
  private params;
  OutletType = 'Create';
  showMessages: any = {};
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];  
  outletForm: FormGroup; 
  outletId: any;
  merchantId : any ;
  userId : any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service : OutletService) { 
    this.params = this.activatedRoute.snapshot.params;
    this.outletId = this.params.id;
       
    this.merchantId = sessionStorage.getItem('merchantId');
    this.userId = sessionStorage.getItem('userId');
  }
  
  ngOnInit(){   
    this.initForm()
    if(this.params.id){
      this.service.getOutletByMechantId(this.merchantId,this.outletId)
      .subscribe((result) => {          
          if (result.error) {
            this.errors.push(result.error);              
          } else {
            var obj :any = {};
            obj.merchantId = result.merchantId;
            obj.name = result.name;
            obj.userId = result.userId;
            obj.latitude = result.latitude;
            obj.longitude = result.longitude;
            obj.contacts = {};
            obj.contacts.address = result.contacts.address;
            obj.contacts.zip = result.contacts.zip;
            obj.contacts.city = result.contacts.city;
            obj.contacts.state = result.contacts.state;
            obj.contacts.country = result.contacts.country;
            obj.contacts.locality = result.contacts.locality;
            obj.contacts.phone1 = result.contacts.phone1;
            obj.contacts.phone2 = result.contacts.phone2;
            this.outletForm.setValue(obj);
          }            
        },
        error => {         
          this.errors.push(error);
        })
      this.OutletType = 'Edit';
    }
  }  

  initForm(){
    this.outletForm = new FormGroup({      
      'merchantId': new FormControl(this.merchantId, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'userId': new FormControl(this.userId, [Validators.required]),
      'latitude': new FormControl(null, [Validators.required]),
      'longitude': new FormControl(null, [Validators.required]),
      'contacts': new FormGroup({    
        'address': new FormControl(null, [Validators.required]),
        'zip': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'state': new FormControl(null, [Validators.required]),
        'country': new FormControl(null, [Validators.required]),
        'locality': new FormControl(null, [Validators.required]),
        'phone1': new FormControl(null, [Validators.required]), 
        'phone2': new FormControl(null, [Validators.required]),        
      }),
    });
  }

  onSubmit(){    
    this.errors = this.messages = [];
    this.submitted = true;
    var formData : any  = {};
    formData = this.outletForm.value;
    var self = this;
    if(this.outletForm.valid){
      if(this.outletId){
        this.service.updateOutlet(formData, this.merchantId, this.outletId).subscribe(
          (result) => {
            this.submitted = false
            if (result.error) {
              this.errors.push(result.error);              
            } else {
              this.messages.push("Outlet successfully updated");
              setTimeout(function () {
                self.router.navigate(['/merchants/merchant/tabs/outlets']);
              }, 2000)          
            }            
          },
          error => {         
            this.errors.push(error);
          }
        )
      }else{
        this.service.createOutlet(formData, this.merchantId).subscribe(
          (result) => {
            this.submitted = false
            if (result.error) {
              this.errors.push(result.error);              
            } else {
              this.messages.push("Outlet successfully created");
              this.outletForm.reset();
              setTimeout(function () {
                self.router.navigate(['/merchants/merchant/tabs/outlets']);
              }, 2000) 
            }            
          },
          error => {         
            this.errors.push(error);
          }
        )
      }      
    }    
  }
  
}
