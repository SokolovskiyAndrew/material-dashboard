import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersMainComponent } from './components';

const routes: Routes = [{ path: '', component: WorkersMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule {}
