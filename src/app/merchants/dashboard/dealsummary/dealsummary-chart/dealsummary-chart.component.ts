import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class DealSummarychartsPieComponent {
  data: any;  
  @Input() parent: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
   
  }

  ngOnInit() { 
    var self = this;
    var activeDeal = Number(this.parent.activedeal);
    var inactiveDeal = Number(this.parent.inactivedeal);
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.data = {
        labels: ['Active Deals', 'InActive Deals'],
        datasets: [{
          data: [activeDeal, inactiveDeal],
          backgroundColor: [colors.successLight, colors.primaryLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scale: {
          pointLabels: {
            fontSize: 14,
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
