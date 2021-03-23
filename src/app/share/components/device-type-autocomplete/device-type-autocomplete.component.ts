import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DeviceTypeModel } from '../../../core/models/device-type.model';

@Component({
  selector: 'app-device-type-autocomplete',
  templateUrl: './device-type-autocomplete.component.html',
  styleUrls: ['./device-type-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceTypeAutocompleteComponent),
      multi: true
    }
  ]
})
export class DeviceTypeAutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() formControlWith: number;
  @Input() formControlLabel: string;
  @Input() isRequired = false;

  formControl: FormControl = new FormControl('');
  deviceTypes: DeviceTypeModel[] = [
    {
      typeId: 0,
      typeDescription: 'Laptop',
      typeIcon: 'laptop'
    },
    {
      typeId: 1,
      typeDescription: 'Smartphone',
      typeIcon: 'phone_iphone'
    },
    {
      typeId: 2,
      typeDescription: 'Personal Computer',
      typeIcon: 'desktop_mac'
    },
    {
      typeId: 3,
      typeDescription: 'Monitor',
      typeIcon: 'desktop_windows'
    },
    {
      typeId: 4,
      typeDescription: 'Printer',
      typeIcon: 'local_printshop'
    },
    {
      typeId: 5,
      typeDescription: 'Other Device',
      typeIcon: 'devices_other'
    }
  ];
  constructor() {}

  ngOnInit(): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  writeValue(value: string): void {
    this.formControl.setValue(value, { emitEvent: false });
  }
}
