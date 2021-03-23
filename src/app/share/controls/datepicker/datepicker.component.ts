import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Unsubscriber } from '@core/classes';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { Moment } from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS },
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en_GB' },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent extends Unsubscriber implements OnInit, ControlValueAccessor {
  @Input() inputId: string;
  @Input() controlLabel = '';
  @Input() isSundayDisabled: boolean;
  @Input() isRequired = false;
  @Input() isSetDefaultValue = false;

  formControl: FormControl = new FormControl('');

  myFilter = (date: Moment | null): boolean => {
    const day = (date || moment()).day();
    return day !== 0;
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(moment().day());
  }

  onModelChange: (_: any) => void = () => {};

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(datepickerValue: string): void {
    this.formControl.setValue(datepickerValue);

    this.subscribeForFormControlValueChanges();
  }

  subscribeForFormControlValueChanges(): void {
    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((controlValue) => {
      console.log(controlValue.format('MMM Do YY'));
      this.onModelChange(controlValue);
    });
  }
}
