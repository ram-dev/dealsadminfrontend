import { Component, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../@core/data/users.service';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Component({
  selector: 'ngx-profile-cpwd',
  templateUrl: './profile-changepwd.component.html',  
  styleUrls: ['./profile-changepwd.component.scss']  
})
export class ProfileChangePWDComponent {  
  showMessages: any = {};
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  profileResetPassForm: FormGroup; 
  id: any;

  constructor(private userService : UserService) {
    this.id = sessionStorage.getItem('userId');
  }

  ngOnInit() {
    this.submitted = false;
    this.profileResetPassForm = new FormGroup({});
    this.profileResetPassForm.addControl('oldpassword', new FormControl('', [Validators.required]));    
    this.profileResetPassForm.addControl('newpassword', new FormControl('', [Validators.required]));
    this.profileResetPassForm.addControl('confirmpassword', new FormControl(
        '', [Validators.compose(
            [Validators.required, this.validateAreEqual.bind(this)]
        )]
    ));    
  }

  onSubmit() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    var formData : any  = {};
    formData = this.profileResetPassForm.value;  
    formData.id = this.id;  
    var self = this;
    if(this.profileResetPassForm.valid){
      this.userService.resetpassword(formData).subscribe(
        (result : any) => {
          self.submitted = false;
          if(result.error) {            
            self.errors.push(result.error);
          }else {
            self.messages.push("Password successfully updated");            
          }        
        },
        (error : any) => {   
          self.submitted = false;     
          
          self.errors.push(error);
      })
    }
  }

  validateAreEqual(control: FormControl): {[s: string]: boolean}{
    return control.value === this.profileResetPassForm.get("newpassword").value ? null : {
        NotEqual: true
    };    
  }  
}
