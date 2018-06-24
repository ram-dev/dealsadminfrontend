import { Component } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { OutletService } from '../../../@core/data/outlet.service';
import { MerchantListService } from '../../../@core/data/merchant-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'ngx-vendor-list',
  templateUrl: './vendor-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body{
      tr.ng2-smart-filters th{
        padding:0;
      }
    } 

  `],
})
export class VendorListComponent {

  settings = {   
    actions: {
      edit: false, 
      delete: false,
      add:false      
    },
    columns: {
      name: {
        title: 'Vendor Name',
        type: 'string',
        filter:false
      }, 
      categoryId: {
        title: 'Category',
        type: 'html',
        filter:false,
        valuePrepareFunction: (cell, row) => { return `` }
      },
       userId: {
        title: 'User Details',
        type: 'html',
        filter:false,
        valuePrepareFunction: (cell, row) => { return `` }
      },
      amount: {
        title: 'Amount (Rs)',
        type: 'number',
        filter:false
      }, 
      actions: 
      {
        title:'Actions',
        type:'html',
        valuePrepareFunction:(cell,row)=>{         
          return `<div class="btn-group">
          <a title="Edit" class="btn btn-primary  btn-icon" href="/#/admin-merchants/vendor/edit/${row._id}"> 
          <i class="nb-edit"></i> 
          <a title="Add amount" class="btn btn-primary  btn-icon" href="/#/admin-merchants/vendor/edit/${row._id}"> 
          <i class="fa fa-inr"></i> 
          </div>`
        },
        filter:false       
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  id :any ;
  params :any;
 
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: MerchantListService) {
    this.service.getAllMerchant().subscribe( data => {
        if (data instanceof Array) {   
        console.log(data);      
          this.source.load(data);
        }else{
          var arr = [];
          arr.push(data);          
         // this.source.load(arr);
        }        
    });    
    //get merchant details check main category is required and minmum onr outlet and one image
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
