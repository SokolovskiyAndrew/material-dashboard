import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItemModel } from '../../../core/models/device-type.model';

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
  deviceTypes: ListItemModel[] = [
    {
      listItemId: 0,
      listItemValue: 'Laptop',
      listItemIcon: 'laptop'
    },
    {
      listItemId: 1,
      listItemValue: 'Smartphone',
      listItemIcon: 'phone_iphone'
    },
    {
      listItemId: 2,
      listItemValue: 'Personal Computer',
      listItemIcon: 'desktop_mac'
    },
    {
      listItemId: 3,
      listItemValue: 'Monitor',
      listItemIcon: 'desktop_windows'
    },
    {
      listItemId: 4,
      listItemValue: 'Printer',
      listItemIcon: 'local_printshop'
    },
    {
      listItemId: 5,
      listItemValue: 'Other Device',
      listItemIcon: 'devices_other'
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
