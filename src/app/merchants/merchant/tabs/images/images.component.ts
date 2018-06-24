import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl,  FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MerchantListService } from '../../../../@core/data/merchant-list.service';

@Component({
  selector: 'ngx-merchant-images',
  templateUrl: './images.component.html',
   styleUrls: ['./images.component.scss'],
})
export class ImagesComponent { 
  form: FormGroup;
  loading: boolean = false;
  merchantId: any;
  errors: string[] = [];
  messages: string[] = [];  
  isUpload : Boolean = false;
  gallery : any;

  @ViewChild('fileInput') fileInput: ElementRef; 

  constructor(private fb: FormBuilder, private merchantService : MerchantListService, private router: Router) {    
    this.merchantId = sessionStorage.getItem('merchantId');
    this.createForm();    
  }

  showForm() {
    this.isUpload = !(this.isUpload);
  }

  createForm() {
    this.form = this.fb.group({
      merchantId: [this.merchantId],
      image: null
    });
    this.merchantService.getMerchantImages(this.merchantId).subscribe(
      (data) => { 
        if (data instanceof Array) {         
          this.gallery = data;
        }else{
          var arr = [];
          arr.push(data);          
          this.gallery = arr;
        }       
        this.errors =[];
        this.messages = [];        
      }
    )
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          data: reader.result.split(',')[1],          
          size: file.size
        })
      };
    }
  }

  onSubmit() {
    var self = this;
    this.errors =[];
    this.messages = [];
    const formModel = this.form.value;
    if(formModel.image == null){
      this.errors.push('please select file');
    }
    var FileSize = formModel.image.size / 1024 / 1024; // in MB
    if (FileSize > 1) {
      this.errors.push('File size exceeds 1 MB');                
    } else {
      this.loading = true;
      this.merchantService.saveMechantImages(formModel, this.merchantId).subscribe(
        (result) => {
          this.loading = false;
          if (result.error) {
            this.errors.push(result.error);              
          } else {
            this.messages.push("image successfully uploaded");  
            setTimeout(function () {               
                self.gallery = [];
                self.createForm();
              }, 1000)              
          }            
        },
        error => {      
        this.loading = false;   
          this.errors.push(error);
        }
      )      
    }    
  }

  clearFile() {
    this.errors =[];
    this.messages = [];
    this.form.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
