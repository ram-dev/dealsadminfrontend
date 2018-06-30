import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './models/user.model';

import { ApiService } from './api.service';

@Injectable()
export class DealsListService {
    constructor( private apiService: ApiService ) { }

    getAllDealByMechantId(merchantId): Observable<any> {
        return this.apiService.get('deal/'+merchantId)
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    getAllActiveDeal(): Observable<any> {
        return this.apiService.get('deal/?status=true')
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    getAllGoliveDeal(): Observable<any> {
        return this.apiService.get('deal/?golive=true')
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    goliveDeal(dealData, dealId): Observable<any> {
        return this.apiService
           .post('deal/'+dealId+'/golive', dealData)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }

    getAllDownloadDealByMechantId(merchantId): Observable<any> {
        return this.apiService.get('downloaddeal/'+merchantId)
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    getDealByMechantId(merchantId, dealId): Observable<any> {
        return this.apiService.get('deal/'+merchantId+'/view/'+dealId)
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    createDeal(dealData, merchantId): Observable<any> {
        return this.apiService
           .post('deal/'+merchantId+'/create', dealData)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }


    updateDeal(dealData, merchantId, dealId): Observable<any> {
        return this.apiService
           .put('deal/'+merchantId+'/edit/'+dealId, dealData)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }

    deleteDeal(merchantId, dealId): Observable<any> {
        return this.apiService
           .delete('deal/'+merchantId+'/delete/'+dealId)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }

    data = [{
        id: 1,    
        startDate:"12-10-2017",
        endDate :"23-10-2017",
        category:"SPA",
        currentBalance:"1000",
        createDate:"06-10-2017",
        previewDeal:'<a href="#">Sample One</a>',
        status:"Inactive",
        action:1

      }, {
        id: 2,
        startDate:"12-10-2017",
        endDate :"23-10-2017",
        category:"SPA",
        currentBalance:"4500",
        createDate:"06-10-2017",
        previewDeal:'<a href="#">Sample two</a>',
        status:"active",
        action:2
      }, {
        id: 3,
        startDate:"12-10-2017",
        endDate :"23-10-2017",
        category:"SPA",
        currentBalance:"600",
        createDate:"06-10-2017",
        previewDeal:'<a href="#">Sample 3</a>',
        status:"Inactive",
        action:3
      }];

      getData() {
        return this.data;
      }

}
