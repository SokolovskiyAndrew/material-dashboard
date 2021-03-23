import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentTableComponent } from './current-table/components';

const routes: Routes = [{ path: '', component: CurrentTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
