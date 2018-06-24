import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthService, NbAuthJWTToken } from '../../../auth';
import { GeneralService } from '../../../@core/data/general.service';


@Component({
  selector: 'ngx-header-public-top',
  styleUrls: ['./header-public-top.component.scss'],
  templateUrl: './header-public-top.component.html',
})
export class HeaderPublicTopComponent implements OnInit {


  @Input() position: string = 'normal';

  user: any;

  cities: any;

  city : any;

  userMenu = [{ title: 'Log out' ,link:"/auth/logout"}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private generalService : GeneralService) {
    //this.cities = [{name: "Delhi"}];
  }

  ngOnInit() {   
     
    this.generalService.getCityALL()
      .subscribe(
        data => {
          this.cities = data;
          this.city = this.cities[0].name;
          this.generalService.setCityObj(this.city); 
        }
      );
   
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  onChange(event){
    this.generalService.setCityObj(event.target.value); 
  }
}
