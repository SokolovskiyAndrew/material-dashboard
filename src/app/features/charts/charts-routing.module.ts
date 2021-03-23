import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartMainComponent } from './components';

const routes: Routes = [{ path: '', component: ChartMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule {}
