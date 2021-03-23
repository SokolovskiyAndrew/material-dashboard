import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { SharedDataService } from '@core/services/share-data/shared-data.service';

@NgModule({
  declarations: [SidenavMenuComponent],
  imports: [CommonModule, RouterModule, MatIconModule, FlexModule],
  exports: [SidenavMenuComponent],
  providers: [SharedDataService]
})
export class CoreModule {}
