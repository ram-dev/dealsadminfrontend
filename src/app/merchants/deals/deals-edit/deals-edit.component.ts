import { Component, OnInit, Inject , ViewChild } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { LocalDataSource } from 'ng2-smart-table';
import { DealsListService } from '../../../@core/data/deals-list.service';
import { OutletService } from '../../../@core/data/outlet.service';
import { MerchantListService } from '../../../@core/data/merchant-list.service';
import { AmenityService } from '../../../@core/data/amenity.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-deals-edit',
  templateUrl: './deals-edit.component.html',  
  styleUrls: ['./deals-edit.component.scss']  
})
export class DealsEditComponent {
  private params;
  isActive :any;
  selectedPackage = '1';
  DealType = 'Create';
  dealId : any;
  merchantId : any;  
  dealForm: FormGroup;
  showMessages: any = {};  
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];  
  formDataDeal :any ={};
  userId: any;
  backUrl : any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
   private dealService: DealsListService,
   private outletService : OutletService,
   private merchantService: MerchantListService,
   private amenityService: AmenityService ) 
  { 
    this.params = this.activatedRoute.snapshot.params;
    this.dealId = this.params.id;
    this.isActive = this.params.isActive;
    console.log(this.isActive);
    if(this.isActive == true || this.isActive == 'true'){
      this.backUrl = "/admin-merchants/deals/list";
    }else{
      this.backUrl = "/admin-merchants/deals/golive"
    }
    this.merchantId = this.params.merchantId;
    this.userId = sessionStorage.getItem('userId');
    if(this.dealId){
      this.DealType = 'Edit';
      this.dealService.getDealByMechantId(this.merchantId, this.dealId)
        .subscribe(data => {
                      console.log(data);
                      var formdata: any = {};
                      formdata.name = data.name;
                      formdata.status = data.status;
                      formdata.golive = data.golive;                                                           
                      this.dealForm.setValue(formdata);                      
                    });
                    
                  }
  }
  
  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.dealForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
      'golive': new FormControl(null, [Validators.required])      
    });
    
     this.dealForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

  }

  onSubmit(){
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    var formData : any  = {};    
    formData = this.dealForm.value;    
    if(formData.status == "true" || formData.status == true){
      formData.status = true;
    }else{
      formData.status = false;
    }
    if(formData.golive == "true" || formData.golive == true){
      formData.golive = true;
    }else{
      formData.golive = false;
    }
    console.log(formData);
    var self = this;
    if(this.dealForm.valid){
      if(this.dealId){
        this.dealService.updateDeal(formData, this.merchantId, this.dealId)
          .subscribe(
            (result)=>{
              console.log(result);
              this.submitted = false
              if (result.error) {
                this.errors.push(result.error);              
              } else {
                this.messages.push("Deal successfully updated");                
                setTimeout(function () {
                  self.router.navigate([self.backUrl]);
                }, 2000);                 
              } 
            },
            (error) => {
              this.errors.push(error);
            }
          )
      }
    }
  }  

  

  
}
