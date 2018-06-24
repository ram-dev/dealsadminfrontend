import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';

export class generalService {
    getCategory(ids): TreeviewItem[] {
        const foodBeveragesCategory =  new TreeviewItem({
            text: 'FOOD & BEVERAGES', value: "5a290b2d539eb0b14cd91d0c", checked : false, collapsed: true, children: [
                { text: 'Fine Dine', value: "5a2919f13fee7034a0fad59f", checked : false },
                { text: 'Bar / Pub / Lounge', value: "5a2919f13fee7034a0fad59e", checked : false },
                { text: 'Bakery / Fast Food', value: "5a2919f13fee7034a0fad59d" , checked : false},
                { text :"Cafe / Confectionery", value: "5a2919f13fee7034a0fad59c", checked : false}
            ]
        });

        const wellnessCategory =  new TreeviewItem({
            text: 'WELLNESS', value: "5a290b84539eb0b14cd91d1a", collapsed: true, children: [
                { text: 'Salon', value: "5a2919f13fee7034a0fad5a2" , checked : false},
                { text: 'Health & Fitness', value: "5a2919f13fee7034a0fad5a0", children:[
                    {
                        text: 'Zumba / Yoga / Aerobics', value: "5a2919f13fee7034a0fad5a1", checked : false
                    }
                    ]
                }                
            ]
        });

        const spaCategory =  new TreeviewItem({
            text: 'SPA', value: "5a290ba6539eb0b14cd91d1f", collapsed: true, children: [
                { text: 'SPA Services', value: "5a2919f13fee7034a0fad5a3", children:[
                    {
                        text: 'eShopping', value: "5a2919f13fee7034a0fad5a4", checked : false
                    }
                    ]
                }                
            ]
        });

        const entertainmentCategory =  new TreeviewItem({
            text: 'ENTERTAINMENT', value: "57d900c2df896e82ac1f8548", collapsed: true, children: [
                { text: 'Theatre / Movies', value: "5a2919f13fee7034a0fad5a7", checked : false},
                { text: 'Games / Live Events / Concerts', value: "5a2919f13fee7034a0fad5a6", checked : false},
                { text: 'Amusement Park', value: "5a2919f13fee7034a0fad5a5", checked : false}                 
            ]
        });

        const travelCategory =  new TreeviewItem({
            text: 'TRAVEL', value: "5a290c78539eb0b14cd91d37", collapsed: true, children: [
                { text: 'Domestic', value: "5a2919f13fee7034a0fad5ac", checked : false, children: [
                    {text: 'Hotels', value: "5a2919f13fee7034a0fad5af", checked : false},
                    {text: 'Holiday Packages', value: "5a2919f13fee7034a0fad5ae", checked : false},
                    {text: 'Airfare / Tickets', value: "5a2919f13fee7034a0fad5ad", checked : false}
                ]},
                { text: 'International', value: "5a2919f13fee7034a0fad5a8", checked : false, children: [
                    {text: 'Hotels', value: "5a2919f13fee7034a0fad5ab", checked : false},
                    {text: 'Holiday Packages', value: "5a2919f13fee7034a0fad5aa", checked : false},
                    {text: 'Airfare / Tickets', value: "5a2919f13fee7034a0fad5a9", checked : false}
                ]}                                 
            ]
        });

        const eShoppingCategory =  new TreeviewItem({
            text: 'E-SHOPPING', value: "5a290c83539eb0b14cd91d39", collapsed: true, children: [
                { text: 'E-Com /Online Services', value: "5a2919f13fee7034a0fad5b0", checked : false}                             
            ]
        });

        const othersCategory = new TreeviewItem({
            text: 'SERVICES', value: "5a290c8f539eb0b14cd91d3d", checked:false, collapsed: true, children: [
                { text: 'Car Wash', value: "5a2919f13fee7034a0fad5b7", checked : false},
                {text: 'Pest Control', value: "5a2919f13fee7034a0fad5b6", checked : false},
                {text: 'Astrology', value: "5a2919f13fee7034a0fad5b5", checked : false},
                {text: 'Photography / Printing', value: "5a2919f13fee7034a0fad5b4", checked : false},
                {text: 'Music / Dance Classes', value: "5a2919f13fee7034a0fad5b3", checked : false},
                {text: 'Flower / Cake Delivery', value: "5a2919f13fee7034a0fad5b2", checked : false},
                {text: 'Training / Coaching Classes', value: "5a2919f13fee7034a0fad5b1", checked : false}                             
            ]
        });
        function setCategoryLevelOne(ids, categoty){
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
        function setCategoryLevelTwo(ids, categoty){
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
                        var subchildSel = child[j].children; 
                        if(subchildSel){
                            for(var k =0 ; k <subchildSel.length; k++){
                                var child1 = subchildSel[k];
                                if(child1.value == sel){                            
                                    child1.checked = true
                                } 
                            }
                        }                    
                    }                
                }
            }
        }
        setCategoryLevelOne(ids, foodBeveragesCategory);
        setCategoryLevelOne(ids, othersCategory);
        setCategoryLevelOne(ids, eShoppingCategory);
        setCategoryLevelOne(ids, entertainmentCategory);
        setCategoryLevelTwo(ids, wellnessCategory);
        setCategoryLevelTwo(ids, spaCategory);
        setCategoryLevelTwo(ids, travelCategory);

        return [
            foodBeveragesCategory, 
            wellnessCategory, 
            spaCategory, 
            entertainmentCategory, 
            travelCategory, 
            eShoppingCategory,
            othersCategory
        ];
    }
}