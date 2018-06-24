import { Component, OnDestroy, Input, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-dealsummary',
  styleUrls: ['./dealsummary.component.scss'],
  templateUrl: './dealsummary.component.html',
})
export class DealSummaryComponent {

  @Input() activedeal: string;
  @Input() inactivedeal: string;
  dataObj : any =[];
  colors: any;
  themeSubscription: any;
 
  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
    });    
  }

  OnInit(){
    
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
