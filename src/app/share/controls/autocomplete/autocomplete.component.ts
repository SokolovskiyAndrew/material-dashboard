import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItemModel } from '@core/models/device-type.model';
import { takeUntil } from 'rxjs/operators';
import { Unsubscriber } from '@core/classes';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent extends Unsubscriber implements OnInit, ControlValueAccessor {
  @Input() deviceTypes: ListItemModel[] = [];
  @Input() label: string;
  @Input() isUseIcons = false;
  @Input() isDisabled = false;
  @Input() isRequired = false;

  autocompleteFormControl: FormControl = new FormControl();
  currentDeviceType: ListItemModel;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.currentDeviceType = this.deviceTypes[0];
  }

  onModelChange: (_: any) => void = () => {};

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(formControlValue: number): void {
    this.autocompleteFormControl.setValue(formControlValue, { emitEvent: false });

    this.subscribeForFormControlValueChanges();
  }

  subscribeForFormControlValueChanges(): void {
    this.autocompleteFormControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((controlValue) => {
      this.currentDeviceType = this.deviceTypes.find((item) => item.listItemId === controlValue);

      this.onModelChange(controlValue);
    });
  }
}
