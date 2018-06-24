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
export class GeneralService {
    private city: string;
    constructor( private apiService: ApiService ) {       
        this.city = 'Delhi';
    }
    
    getCityALL(): Observable<any> {
        return this.apiService.getWithoutToken('city')
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    public setCityObj(val: string): void {
        this.city = val;
    }

    public getCityObj(): string {
        return this.city;
    }

    getDeals():Observable<any> {
        return this.apiService.getWithoutToken('deal')
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    getDealsByCity(city):Observable<any> {      
        return this.apiService.getWithoutToken('deal?city='+city)
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    getDealsByID(dealId):Observable<any> {
        return this.apiService.getWithoutToken('nondeal/'+dealId)
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

}
