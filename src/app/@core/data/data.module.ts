import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './api.service';
import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import { OutletService } from './outlet.service';
import { MerchantListService } from './merchant-list.service';
import { AmenityService } from './amenity.service';
import { GalleryService } from './gallery.service';
import { GeneralService } from './general.service';

const SERVICES = [
  ApiService,
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  OutletService,
  MerchantListService,
  AmenityService,
  GalleryService,
  GeneralService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        SERVICES,
      ],
    };
  }
}
