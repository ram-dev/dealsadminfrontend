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
export class OutletService {
    constructor( private apiService: ApiService ) { }

    getAllOutletByMechantId(merchantId): Observable<any> {
        return this.apiService.get('merchant/'+merchantId+'/outlet')
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    getOutletByMechantId(merchantId, outletId): Observable<any> {
        return this.apiService.get('merchant/'+merchantId+'/outlet/'+outletId)
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    createOutlet(merchant, merchantId): Observable<any> {
        return this.apiService
           .post('merchant/'+merchantId+'/outlet', merchant)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }


    updateOutlet(merchant, merchantId, outletId): Observable<any> {
        return this.apiService
           .put('merchant/'+merchantId+'/outlet/'+outletId, merchant)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }

    deleteOutlet(merchantId, outletId): Observable<any> {
        return this.apiService
           .delete('merchant/'+merchantId+'/outlet/'+outletId)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }
}
