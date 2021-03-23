import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersMainComponent } from './components';
import { WorkersRoutingModule } from './workers-routing.module';

@NgModule({
  declarations: [WorkersMainComponent],
  imports: [CommonModule, WorkersRoutingModule]
})
export class WorkersModule {}
