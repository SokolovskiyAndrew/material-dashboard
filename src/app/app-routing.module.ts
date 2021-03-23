import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training/training.component';
import { DeactivateGuard } from './core/guards/deactivate/deactivate.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'workers',
    loadChildren: () => import('./features/workers/workers.module').then((m) => m.WorkersModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('./features/charts/charts.module').then((m) => m.ChartsModule)
  },
  { path: 'calendar', component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
