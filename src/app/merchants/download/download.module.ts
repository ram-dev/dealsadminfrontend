import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DownloadRoutingModule, routedComponents } from './download-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { DealsListService } from '../../@core/data/deals-list.service';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    ThemeModule,
    DownloadRoutingModule,
    Ng2SmartTableModule,
    TreeviewModule.forRoot()
  ],
  declarations: [
    routedComponents,
  ],
  providers: [
    SmartTableService,
    DealsListService
  ],
})
export class DownloadModule { }
