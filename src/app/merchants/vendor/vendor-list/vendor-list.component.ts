import { Component } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { OutletService } from '../../../@core/data/outlet.service';
import { MerchantListService } from '../../../@core/data/merchant-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'ngx-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'] 
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
        valuePrepareFunction: (cell, row) => {
          var item = '';
          for(var i=0; i < cell.length; i++){
              item += '<div>'+cell[i].name+'</div>'
          }                 
          return item;
        }
      },
       userId: {
        title: 'User Details',
        type: 'html',
        filter:false,
        valuePrepareFunction: (cell, row) => { 
          var item= '';
          item += '<div>'+cell.firstName +' '+ cell.lastName+'</div>'; 
          item += '<div>'+cell.username+'</div>'; 
          item += '<div>'+cell.contacts.phone1+'</div>';                   
          return item; 
        }
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
          return `
         <div class="divided-button-group">
          <div class="btn-group btn-divided-group ">
          <a title="View" class="btn btn-primary  btn-icon" href="/#/admin-merchants/vendor/view/${row._id}"> 
          <i class="fa fa-ellipsis-h"></i> 
          <a title="Add amount" class="btn btn-primary  btn-icon" href="/#/admin-merchants/vendor/add/${row._id}"> 
          <i class="fa fa-plus-square-o"></i> 
          </div></div>`
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
          this.source.load(arr);
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
