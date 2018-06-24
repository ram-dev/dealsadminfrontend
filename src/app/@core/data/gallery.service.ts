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
export class GalleryService {
    constructor( private apiService: ApiService ) { }

    getMerchantByMechantId(merchantId): Observable<any> {
        return this.apiService.get('merchant/'+merchantId)
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }  

    getMerchantImages(merchantId): Observable<any> {
        return this.apiService.get('merchant/'+merchantId+'/images')
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }  

    saveMechantGeneral(merchant, merchantId): Observable<any> {
        return this.apiService
           .post('merchant/'+merchantId, merchant)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }

    saveMechantImages(merchant, merchantId): Observable<any> {
        return this.apiService
           .post('merchant/'+merchantId+'/images', merchant)
           .map((res) => res)
           .catch((error) => {
                return error
            }
        );
    }
        
}
