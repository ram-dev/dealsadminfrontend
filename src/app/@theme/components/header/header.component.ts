import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { User } from '../../../@core/data/models/user.model';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position: string = 'normal';

  user: any ;

  userMenu = [{ title: 'Log out' ,link:"/auth/logout"}];

  constructor( private router: Router,
              private route: ActivatedRoute,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          this.user = data;
          sessionStorage.setItem('merchantId',this.user.merchant);
          this.user.name = data.firstName + ' '+ data.lastName
          if(data.avatar == 'default.png' || data.avatar == 'Default.jpg'){
            this.user.picture = 'assets/images/default.png';
          }else{
            this.user.picture = data.avatar;
          }                    
        },
        error => {
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('merchantId');
          this.router.navigate(['/auth/login']);          
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
}
