import { Component, OnInit, Inject } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { generalService } from './general.service';
import { MerchantListService } from '../../../../@core/data/merchant-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-merchant-general',
  templateUrl: './general.component.html',
})
export class GeneralComponent {
  private params;
  config = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: true,
        maxHeight: 400
    });
  values: string[]; 
  items: TreeviewItem[];
  merchantId: any;
  userId: any;
  showMessages: any = {};
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];  
  generalForm: FormGroup;
  selectedAminity: any = [];

  constructor(private router : Router, private activatedRoute: ActivatedRoute, 
      private categoryservice: generalService,
      private service: MerchantListService
    ) {
      this.merchantId = sessionStorage.getItem('merchantId');
      this.userId = sessionStorage.getItem('userId');
    }

    ngOnInit() {
      this.initForm()
      
      this.service.getMerchantByMechantId(this.merchantId)
      .subscribe((result) => {          
          if (result.error) {
            this.errors.push(result.error);              
          } else {
            var obj :any = {};
            
            obj._id = result._id;
            obj.name = result.name;
            obj.userId = result.userId;
            this.selectedAminity = result.amenityId;
            this.items = this.categoryservice.getCategory(result.categoryId);
            //obj.categoryId = result.categoryId;
            obj.url = result.url || '';           
            this.generalForm.setValue(obj);
          }            
        },
        error => {         
          this.errors.push(error);
        })
    }

    onSelectedChange(values: string[]) {
      this.values = values;
    }

    initForm(){
      this.generalForm = new FormGroup({      
        '_id': new FormControl(this.merchantId, [Validators.required]),
        'name': new FormControl(null, [Validators.required]),
        'userId': new FormControl(this.userId, [Validators.required]),        
        'url': new FormControl(''),        
      });
    }

    onSubmit(){
      this.errors =[];
      this.messages = [];
      this.submitted = true;
      var formData : any  = {};
      formData = this.generalForm.value;
      var self = this;     
      if(this.values.length == 0){
        this.errors.push('please select atleast one business service');
        this.submitted = false;
      }else{
        formData.categoryId =[];
        for(var i =0 ; i < this.values.length; i++){
          formData.categoryId.push(this.values[i]);
        }
        if(this.generalForm.valid){   
          formData.amenityId = this.selectedAminity;    
           this.service.saveMechantGeneral(formData, this.merchantId).subscribe(
            (result) => {
              this.submitted = false
              if (result.error) {
                this.errors.push(result.error);              
              } else {
                this.messages.push("General successfully Updated");                
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
