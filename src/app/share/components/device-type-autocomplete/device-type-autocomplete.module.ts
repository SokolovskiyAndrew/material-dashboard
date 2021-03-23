import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceTypeAutocompleteComponent } from './device-type-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [DeviceTypeAutocompleteComponent],
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatIconModule, MatInputModule],
  exports: [DeviceTypeAutocompleteComponent]
})
export class DeviceTypeAutocompleteModule {}
