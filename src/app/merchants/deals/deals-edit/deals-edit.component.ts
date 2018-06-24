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
  selectedPackage = '1';
  DealType = 'Create';
  dealId : any;
  merchantId : any;
  outLetList : any = [];
  mainCategoryList :any = [];
  subCategoryList : any = [];
  imagesList : any = [];
  categoryList : any= [];
  merchantData :any = {};
  dealForm: FormGroup;
  showMessages: any = {};  
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];  
  daysType = ['Week Days', 'Weekend', 'All Days'];
  amount : any = 0;
  offerTypeList = [
    {name: 'Flat Discount', value: '1'},
    {name: 'Minimum Discount', value: '2'},
    {name: 'Buy/Get Discount', value: '3'},
    {name: 'Package Campaign/Deal', value: '4'},
    
  ];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: true,
    maxHeight: 500
  });
  OutletTree: any = [];
  subCategoryitems: TreeviewItem[] = [];  
  outletIdItems: TreeviewItem[] =[];
  imgIdItems : TreeviewItem[] =[];
  subCategoryValues: any = []; 
  outletIdValues : any = [];
  imagesValues: any = [];
  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[1];
  formDataDeal :any ={};
  userId: any;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
   private dealService: DealsListService,
   private outletService : OutletService,
   private merchantService: MerchantListService,
   private amenityService: AmenityService ) 
  { 
    this.params = this.activatedRoute.snapshot.params;
    this.dealId = this.params.id;
    this.merchantId = sessionStorage.getItem('merchantId');
    this.userId = sessionStorage.getItem('userId');
    this.merchantService.getMerchantByMechantId(this.merchantId)
      .subscribe((result) => {
        this.merchantData = result;
        this.outletService.getAllOutletByMechantId(this.merchantId).subscribe( data => {
            if (data instanceof Array) {         
              this.outLetList = data;
            }else{
              var arr = [];
              arr.push(data);   
              this.outLetList = arr;          
            } 
            this.merchantService.getMerchantImages(this.merchantId).subscribe( data => {
                if (data instanceof Array) {         
                  this.imagesList = data;
                }else{
                  var arr = [];
                  arr.push(data);   
                  this.imagesList = arr;          
                } 
                this.amenityService.getAllCategory().subscribe( data => {
                  this.categoryList = data;
                  for(var i=0; i< this.merchantData.categoryId.length; i++){
                    var category = this.merchantData.categoryId[i];
                    for(var k =0 ; k < this.categoryList.length; k++){
                      var cat = this.categoryList[k];
                      if(category == cat._id && cat.parent == null){
                        this.mainCategoryList.push(cat);
                      }else if(category == cat._id && cat.parent != null){
                        this.subCategoryList.push(cat);
                      }
                    }                    
                  }
                  var arrayObj: any = [];
                  this.outLetList.forEach(function (value) {
                    var obj: any = {};
                    obj.name = value.name;
                    obj.text = value.name;
                    obj.value = value._id;
                    obj.checked = false;
                    arrayObj.push(obj)
                  })
                  this.outletIdItems = arrayObj;
                  var arrayimgObj: any = [];
                  this.imagesList.forEach(function (value) {
                    var obj: any = {};
                    obj.name = value.image.filename;
                    obj.path = value.path;
                    obj.text = value.path;
                    obj.value = value._id;
                    obj.checked = false;
                    arrayimgObj.push(obj)
                  })
                  this.imgIdItems = arrayimgObj;       
                  this.amount = this.merchantData.amount;
                  if(this.dealId){
                    this.DealType = 'Edit';
                    this.dealService.getDealByMechantId(this.merchantId, this.dealId)
                    .subscribe(data => {
                      var formdata: any = {};
                      formdata.name = data.name;
                      formdata.dayAllocationType = data.dayAllocationType;
                      formdata.discount = data.discount;
                      formdata.fundAllocation = data.fundAllocation;
                      formdata.mainCategoryId = data.mainCategoryId._id;
                      formdata.offer = data.offer;
                      formdata.offerDeatils = data.offerDeatils;
                      var datePipe = new DatePipe("en-US");                      
                      formdata.offerValidFrom = datePipe.transform(data.offerValidFrom, 'yyyy-MM-dd') || '';
                      formdata.offerValidTo = datePipe.transform(data.offerValidTo, 'yyyy-MM-dd') || '';
                      formdata.offertype = data.offertype;
                      formdata.offertype_one = data.offertype_one;
                      formdata.offertype_two = data.offertype_two;
                      formdata.terms= data.terms;                                            
                      this.dealForm.setValue(formdata);
                      this.onSelectedMainCatChange();
                    });
                  }else{
                    this.initForm();
                  }
                })   
            });       
        });
      })
  }
  
  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.dealForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'mainCategoryId': new FormControl(null, [Validators.required]),
      'offertype': new FormControl(this.selectedPackage, [Validators.required]),
      'discount': new FormControl(null, [Validators.required]),
      'offer': new FormControl(null, [Validators.required]),
      'offerValidFrom': new FormControl(null, [Validators.required]),
      'offerValidTo': new FormControl(null, [Validators.required]),
      'terms': new FormControl(null, [Validators.required]),      
      'offertype_one': new FormControl(null, [Validators.required]),
      'offertype_two': new FormControl(null, [Validators.required]), 
      'offerDeatils': new FormControl(null, [Validators.required]), 
      'fundAllocation': new FormControl(null, [Validators.required]), 
      'dayAllocationType': new FormControl(this.daysType[0]),
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
    if(this.outletIdValues == null || this.outletIdValues == undefined || this.outletIdValues == ''){
      this.errors.push("please select outlet!");
      this.submitted = false;
    }
    if(this.imagesValues == null || this.imagesValues == undefined || this.imagesValues == ''){
      this.errors.push("please select Image!");
      this.submitted = false;
    }
    formData.subCategoryIds = []
    this.subCategoryValues.forEach(function (value) {
     formData.subCategoryIds.push(value._id);
    });
    formData.images = []
    this.imagesValues.forEach(function (value) {
     formData.images.push(value.value);
    });
    formData.outletIds = []
    this.outletIdValues.forEach(function (value) {     
     formData.outletIds.push(value.value);
    }); 
    formData.userId = this.userId; 
   
    var self = this;
    if(this.dealForm.valid){
      if(this.dealId){
        this.dealService.updateDeal(formData, this.merchantId, this.dealId)
          .subscribe(
            (result)=>{
              this.submitted = false
              if (result.error) {
                this.errors.push(result.error);              
              } else {
                this.messages.push("Deal successfully updated");                
                setTimeout(function () {
                  self.router.navigate(['/merchants/deals/list']);
                }, 2000);                 
              } 
            },
            (error) => {
              this.errors.push(error);
            }
          )
      }else{
        this.dealService.createDeal(formData, this.merchantId)
        .subscribe(
            (result) => {
            this.submitted = false
            if (result.error) {
                this.errors.push(result.error);              
              } else {
                this.messages.push("Deal successfully Created");
                setTimeout(function () {
                  self.router.navigate(['/merchants/deals/list']);
                }, 2000);             
              }           
          },
          error => {         
          this.errors.push(error);
        })
      }      
    }
  }  

  offerChange(){   
    this.dealForm.controls['offertype_one'].setValue(null);
    this.dealForm.controls['offertype_two'].setValue(null);  
  }

  onSelectedChange(){

  }

  onSelectedMainCatChange(){       
    var selected : any = this.dealForm.get('mainCategoryId');
    var mainCat = this.mainCategoryList;
    var subCat = this.subCategoryList;
    var selectedMainCat = [];
    var selectedSubCat = [];
    mainCat.forEach(function (value) {
      
      if(value._id == selected._value){
        selectedMainCat.push(value);
      }
    });
    subCat.forEach(function (value) {
     
      if(value.parent == selected._value){
        selectedSubCat.push(value);
      }else{
        var found = selectedMainCat[0].ancestors.indexOf(value.parent);
        if(found != -1){
          selectedSubCat.push(value);
        }
      }
    });
 
    this.subCategoryitems = selectedSubCat;
  }

  onSelectedOutletChange(outlet){   
    this.outletIdValues = outlet;
  }

  onSelectedSubCatChange(subCat){    
    this.subCategoryValues = subCat;
  }

  onSelectedImageChange(imgIDS){
     this.imagesValues = imgIDS;
  }

  onChangeValue(event){   
    event.preventDefault()
    this.dealForm.valueChanges.subscribe(
        (value) => {          
          this.formDataDeal = value;          
        }
    );
    var value :any = this.formDataDeal;
    if(value.offertype == '1'){        
      if(value.offertype_one != null && value.offertype_two != null){
        value.discount = value.offertype_one;
        value.offer = 'Flat '+ value.offertype_one +' % discount on '+ value.offertype_two;
        this.dealForm.patchValue({'discount':value.discount, 'offer': value.offer});              
      }   
    }
    if(value.offertype == '2'){        
      if(value.offertype_one != null && value.offertype_two != null){             
        value.discount =(value.offertype_one / value.offertype_two)*100;
        value.offer = 'Flat Get Rs.'+ value.offertype_one +' Off on a minimum bill of Rs.'+ value.offertype_two;
        this.dealForm.patchValue({'discount':value.discount, 'offer': value.offer});              
      }   
    }
    if(value.offertype == '3'){        
      if(value.offertype_one != null && value.offertype_two != null){
        value.discount =(value.offertype_two / value.offertype_one)*100;
        value.offer = 'Buy '+value.offertype_one+' Get '+value.offertype_two+' Free';
        this.dealForm.patchValue({'discount':value.discount, 'offer': value.offer});              
      }   
    }
    event.stopPropagation();
  }
}
