import { Component, OnInit, Inject , ViewChild } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { LocalDataSource } from 'ng2-smart-table';
import { MerchantListService } from '../../../@core/data/merchant-list.service';
import { OutletService } from '../../../@core/data/outlet.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-vendor-add',
  templateUrl: './vendor-add.component.html',  
  styleUrls: ['./vendor-add.component.scss']  
})
export class VendorAddComponent {
  merchantId : any; 
  params : any;
  dealSource : any;
  images : any;
  outlets : any;
  addAmountForm: FormGroup;
  showMessages: any = {};  
  submitted = false;
  errors: string[] = [];
  messages: string[] = []; 
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private merchantService: MerchantListService, private outletService: OutletService) 
  { 
    this.params = this.activatedRoute.snapshot.params;   
    this.merchantId = this.params.id;    
    this.merchantService.getMerchantByMechantId(this.merchantId).subscribe( data => {
      this.dealSource = data;
    });
     
  }
  
  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.addAmountForm = new FormGroup({
      'amount': new FormControl(null, [Validators.required]),
      'paymentinfo': new FormControl(null, [Validators.required])      
    });
    
    this.addAmountForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

   onSubmit(){
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    var formData : any  = {};    
    formData = this.addAmountForm.value;
    var self = this;
    if(this.addAmountForm.valid){
      if(this.merchantId){
        this.merchantService.addAmountMerchant(formData, this.merchantId)
          .subscribe(
            (result)=>{
              this.submitted = false
              if (result.error) {
                this.errors.push(result.error);              
              } else {
                this.messages.push("Amount successfully updated");                
                setTimeout(function () {
                  self.router.navigate(['/admin-merchants/vendor/list']);
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
