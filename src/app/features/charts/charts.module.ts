import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartMainComponent } from './components';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
  declarations: [ChartMainComponent],
  imports: [CommonModule, ChartsRoutingModule]
})
export class ChartsModule {}
