import { TreeviewItem } from 'ngx-treeview';
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
export class AmenityService {
    constructor( private apiService: ApiService ) { }

    amenityData = [];

    getAllAmenity(): Observable<any> {
        return this.apiService.get('amenity')
            .map((res) => {
                this.setdata(res);
                return res
            })
            .catch((error) => {
                return error
            }
        );
    }

    getAllCategory(): Observable<any> {
        return this.apiService.get('category')
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    setdata(res){
        this.amenityData = [];
        for(var i= 0; i < res.length; i++){
            var obj : any = {};
                obj.text = res[i].name;
                obj.value = res[i]._id;
                obj.checked = false;
                obj.collapsed = true;
                obj.categoryID = res[i].categortID;
                obj.children = [];
            this.amenityData.push(obj);
        }
        
    }
    getAllSubAmenity(): Observable<any> {
        return this.apiService.get('subamenity')
            .map((res) => res)
            .catch((error) => {
                return error
            }
        );
    }

    generateTreeView(categoryIds, subamenityList, selectedAminity): TreeviewItem[] {       
        var mainAmenity : any = this.amenityData;        
        var main : any = [];
        var finalList : any = [];
        
        for(var i = 0 ; i< mainAmenity.length; i++){  
                for(var j = 0 ; j< categoryIds.length; j++){
                    var isFound = mainAmenity[i].categoryID.indexOf(categoryIds[j]);   
                    if(isFound != -1){  
                        finalList.push(mainAmenity[i]);                          
                    }
                }               
        }
        for(var k = 0 ; k < finalList.length; k++){
            var j = k + 1;
            if( j < finalList.length){
                if(finalList[k].value == finalList[j].value){
                    finalList.splice(k,1)
                }
            }
        } 
        for(var k = 0 ; k < finalList.length; k++){
            var j = k + 1;
            if( j < finalList.length){
                if(finalList[k].value == finalList[j].value){
                    finalList.splice(k,1)
                }
            }
        } 
        for(var j = 0 ; j< finalList.length; j++){
                var fnlist = finalList[j];
                for(var k = 0 ; k < subamenityList.length; k++){
                    var sublist = subamenityList[k];
                    if(fnlist.value == sublist.aminityId){
                        var obj :any ={};
                        obj.text = sublist.name;
                        obj.value = sublist._id;
                        obj.checked = false;
                        fnlist.children.push(obj);
                    }
                }
        }
        
        for(var i = 0 ; i< finalList.length; i++){  
            main[i] =  new TreeviewItem(finalList[i]);
        }

        function setAmenity(ids, categoty){
            for(var i=0 ; i < ids.length ; i++){
                var sel = ids[i];
                if(categoty.value == sel){                   
                    categoty.checked = true;
                }else{
                    var child = categoty.children;                   
                    for(var j =0; j < child.length ; j++){
                        var childSel = child[j];
                        if(childSel.value == sel){                            
                            childSel.checked = true
                        }                        
                    }                
                }
            }
        }

        for(var i = 0 ; i< main.length; i++){  
            setAmenity(selectedAminity, main[i]);
        }

        return main;
    }
}