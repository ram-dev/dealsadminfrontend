import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { OutletService } from '../../../../@core/data/outlet.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ngx-merchant-outlets',
  template: `
     <div style="margin-bottom:10px;"> 
    <a href="/#/merchants/merchant/outlets/edit" class="btn btn-outline-success btn-sm"><i class="nb-plus"></i> Create Outlets</a>
   </div>
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)">
    </ng2-smart-table> 
  `,
})
export class OutletsComponent { 
  settings = {   
    actions: {
      edit: false, 
      delete: false,
      add:false      
    },
    columns: {     
      name: {
        title: 'Name',
        type: 'string',
        filter:false 
      }, 
      phone1: {
        title: 'Call On',
        type: 'string',
        filter:false,
         valuePrepareFunction: (cell, row) => {           
          return row.contacts.phone1;
        },
      }, 
      phone2: {
        title: 'SMS On',
        type: 'string',
        filter:false,
         valuePrepareFunction: (cell, row) => { 
          return row.contacts.phone2;
        },
      }, 
      address: {
        title: 'Full Address',
        type: 'html',
        filter:false,
         valuePrepareFunction: (cell, row) => { 
          var add =  row.contacts.address+' <br> '+row.contacts.city+' <br> '+row.contacts.state +' <br> '+row.contacts.country + ' - '+row.contacts.zip;
          return add;
        },
      },           
      latitude: {
        title: 'Lat Long',
        type: 'string',
        valuePrepareFunction: (cell, row) => {           
          return row.latitude +' , ' +row.longitude ;
        },
        filter:false 
      },      
      actions: //or something
      {
        title:'Actions',
        type:'html',
        valuePrepareFunction:(cell,row)=>{         
          return `<div class="btn-group">
          <a title="Edit" class="btn btn-primary btn-icon" href="/#/merchants/merchant/outlets/edit/${row._id}"> 
          <i class="nb-edit"></i> 
          <a title="Delete" class="btn btn-danger btn-icon" href="/#/merchants/merchant/tabs/outlets/delete/${row._id}" >
           <i class="nb-trash"></i>
           </a></div>`
        },
        filter:false       
      },
    },
  }; 
  id :any ;
  params :any;
  source: LocalDataSource = new LocalDataSource();
  isDelte : Boolean = false;
  deleteId : any ;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: OutletService) {
    this.id = sessionStorage.getItem('merchantId');
    this.params = this.activatedRoute.snapshot.params;
    if(this.activatedRoute.snapshot.url.length == 3){
      if(this.activatedRoute.snapshot.url[1].path == 'delete'){
        this.isDelte = true;
        this.deleteId = this.params.id;
        this.onDeleteoutlet();
      }
    }   
   
    this.service.getAllOutletByMechantId(this.id).subscribe( data => {
        if (data instanceof Array) {         
          this.source.load(data);
        }else{
          var arr = [];
          arr.push(data);          
          this.source.load(arr);
        }        
    });    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteoutlet(){
    var self = this;
    if (window.confirm('Are you sure you want to delete?')) {     
      this.service.deleteOutlet(this.id, this.deleteId).subscribe( data => {
         self.router.navigate(['/merchants/merchant/tabs/outlets']);
      });          
    } else {      
      self.router.navigate(['/merchants/merchant/tabs/outlets']);      
    }
  }
}

