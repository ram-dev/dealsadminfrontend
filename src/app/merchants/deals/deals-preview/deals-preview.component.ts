import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DealsListService } from '../../../@core/data/deals-list.service';
import { OutletService } from '../../../@core/data/outlet.service';
import { MerchantListService } from '../../../@core/data/merchant-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'deal-preview',
  templateUrl: './deals-preview.component.html',
  styleUrls: ['./deals-preview.component.scss']
})
export class DealPreviewComponent implements OnInit {
  @Input() product: {};
  public sliders: Array<any> = []; 
  merchantId : any;
  id: any;
  params : any;
  dealSource : any;
   constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: DealsListService) {
    this.merchantId = sessionStorage.getItem('merchantId');
    this.params = this.activatedRoute.snapshot.params;
   
    this.id = this.params.id;
  }
  

  ngOnInit() {
    this.service.getDealByMechantId(this.merchantId,this.id).subscribe( data => {
        /*if (data instanceof Array) {         
          this.source.load(data);
        }else{
          var arr = [];
          arr.push(data);          
          this.source.load(arr);
        }  */    
        this.dealSource = data;
        this.dealSource.outletList = data.outletIds[0];
        this.dealSource.lat = Number(this.dealSource.outletList.latitude);
        this.dealSource.lng = Number(this.dealSource.outletList.longitude);
        console.log(this.dealSource);
        if(data.images.length == 0){
          this.sliders.push({
            imagePath: 'assets/images/default-bg.png',
            label: '',
            text: ''
          })
        }else{
          for(var i = 0; i < data.images.length;i++ ){
            this.sliders.push({
              imagePath: data.images[i].path,
              label: '',
              text: ''
            })
          }
          
        }
    });
  }

}
