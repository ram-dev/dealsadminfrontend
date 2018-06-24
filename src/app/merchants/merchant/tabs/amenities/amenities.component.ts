import { Component, OnInit, Inject } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { AmenityService } from '../../../../@core/data/amenity.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MerchantListService } from '../../../../@core/data/merchant-list.service';

@Component({
  selector: 'ngx-merchant-amenities',
  templateUrl: './amenities.component.html',
})
export class AmenitiesComponent { 
  private params;
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: true,
    maxHeight: 600
  });
  values: string[]; 
  items: TreeviewItem[];
  merchantId: any;
  userId : any;
  amenityList : any ;
  subamenityList : any ;
  mainCategory :any = [
  "5a290b2d539eb0b14cd91d0c", 
  "5a290b84539eb0b14cd91d1a",
  "5a290c8f539eb0b14cd91d3d", 
  "5a290c83539eb0b14cd91d39",
  "57d900c2df896e82ac1f8548", 
  "5a290c78539eb0b14cd91d37", 
  "5a290ba6539eb0b14cd91d1f" 
  ];
  selectedCategory : any = [];
  merchantData : any ;
  selectedAminity: any = [];
  amenityForm: FormGroup;
  errors: string[] = [];
  messages: string[] = [];  


  constructor(private router : Router, private activatedRoute: ActivatedRoute, private service: AmenityService, private merchantService : MerchantListService) {
    this.merchantId = sessionStorage.getItem('merchantId');
    this.userId = sessionStorage.getItem('userId');
  }

   ngOnInit() {
    this.merchantService.getMerchantByMechantId(this.merchantId)
    .subscribe((result) => {  
      this.merchantData = result; 
      this.selectedCategory = [];
      for(var i = 0 ; i < result.categoryId.length; i++){
        var found = this.mainCategory.indexOf(result.categoryId[i]);
        if(found != -1){
          this.selectedCategory.push(result.categoryId[i]);
        }
      }
      this.service.getAllAmenity().subscribe((result) => {  
        this.amenityList = result;
        this.service.getAllSubAmenity().subscribe((result) => {  
          this.subamenityList = result;
          this.selectedAminity = this.merchantData.amenityId 
          this.items = this.service.generateTreeView(this.selectedCategory,this.subamenityList, this.selectedAminity);
          
        })         
      })
    })
   }

  onSelectedChange(values: string[]) {
    this.values = values;
  }

  onSubmit(){
       
    this.merchantData.amenityId = this.values;
    
    var formData = this.merchantData;
    this.merchantService.saveMechantGeneral(formData, this.merchantId).subscribe(
      (result) => {     
              
        if (result.error) {
          this.errors.push(result.error);              
        } else {
          this.messages.push("Amenity successfully Updated");                
        }            
      },
      error => {         
        this.errors.push(error);
      }
    )
  }
}
