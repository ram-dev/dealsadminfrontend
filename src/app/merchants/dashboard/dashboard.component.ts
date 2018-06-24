import { Component, OnInit, Inject } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { MerchantListService } from '../../@core/data/merchant-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  merchantId : any;
  userId : any;
  statsData: any;

  constructor(
    private router : Router, 
    private activatedRoute: ActivatedRoute, 
    private service: MerchantListService
  ) {   
    this.userId = sessionStorage.getItem('userId');
  }

  ngOnInit() {     
    this.statsData = {"total_vendor":"10","total_deals":8,"total_downloads":1000}
  }
}
