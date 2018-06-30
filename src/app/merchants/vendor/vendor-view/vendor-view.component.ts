import { Component, OnInit, Inject , ViewChild } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { LocalDataSource } from 'ng2-smart-table';
import { MerchantListService } from '../../../@core/data/merchant-list.service';
import { OutletService } from '../../../@core/data/outlet.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-vendor-view',
  templateUrl: './vendor-view.component.html',  
  styleUrls: ['./vendor-view.component.scss']  
})
export class VendorViewComponent {
  merchantId : any; 
  params : any;
  dealSource : any;
  images : any;
  outlets : any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private merchantService: MerchantListService, private outletService: OutletService) 
  { 
    this.params = this.activatedRoute.snapshot.params;   
    this.merchantId = this.params.id;
    //getMerchantByMechantId
     this.merchantService.getMerchantByMechantId(this.merchantId).subscribe( data => {
       this.dealSource = data;
       console.log(this.dealSource);
     });
     this.merchantService.getMerchantImages(this.merchantId).subscribe( data => {
       if (data instanceof Array) {             
          this.images= data;
        }else{
          var arr = [];
          arr.push(data);          
          this.images = arr;
        }   
         console.log(this.images);
     });
     this.outletService.getAllOutletByMechantId(this.merchantId).subscribe( data =>{
       if (data instanceof Array) {             
          this.outlets= data;
        }else{
          var arr = [];
          arr.push(data);          
          this.outlets = arr;
        }   
         console.log(this.outlets);
     });
  }
  
  ngOnInit(){

    
  }

  
}
