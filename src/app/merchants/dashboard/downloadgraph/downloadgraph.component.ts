import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { ElectricityService } from '../../../@core/data/electricity.service';

@Component({
  selector: 'ngx-downloadgraph',
  styleUrls: ['./downloadgraph.component.scss'],
  templateUrl: './downloadgraph.component.html',
})
export class DownloadGraphComponent implements OnDestroy {

  data: Array<any>;

  type: string = 'week';
  types = ['week', 'month', 'year'];

  currentTheme: string;
  themeSubscription: any;

  constructor(private eService: ElectricityService, private themeService: NbThemeService) {
    this.data = eService.getData();

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
