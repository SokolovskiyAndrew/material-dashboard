import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentTableComponent } from './current-table/components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NewOrderModalComponent } from './current-table/modals';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DeviceTypeAutocompleteModule } from '@share/components/device-type-autocomplete/device-type-autocomplete.module';
import { MatSelectModule } from '@angular/material/select';
import { AutocompleteModule } from '@share/controls/autocomplete/autocomplete.module';
import { DeviceInfoComponent } from './current-table/form-controls';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatepickerModule } from '@share/controls';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { OrderStatusIconColorDirective } from './current-table/directives/order-status-icon-color.directive';
import { ShareModalsModule } from '@share/modals/share-modals.module';
import { MatMenuModule } from '@angular/material/menu';

const maskConfig: Partial<IConfig> = {
  validation: true
};

@NgModule({
  declarations: [
    CurrentTableComponent,
    NewOrderModalComponent,
    DeviceInfoComponent,
    OrderStatusIconColorDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatCardModule,
    MatBadgeModule,
    MatSlideToggleModule,
    DeviceTypeAutocompleteModule,
    MatSelectModule,
    MatStepperModule,
    MatMenuModule,
    FontAwesomeModule,
    AutocompleteModule,
    DatepickerModule,
    ShareModalsModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class DashboardModule {}
