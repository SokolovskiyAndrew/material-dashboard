import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { DeviceInfoFormControlsEnum } from '../../enums/device-info-form-controls.enum';
import { ListItemModel } from '@core/models/device-type.model';
import { CheckFormControlForError, Unsubscriber } from '@core/classes';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { DeviceInfoInterface } from '../../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceInfoComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DeviceInfoComponent),
      multi: true
    }
  ]
})
export class DeviceInfoComponent extends Unsubscriber implements OnInit, ControlValueAccessor, Validator {
  @Input() deviceTypes: ListItemModel[] = [];
  @Input() brandsList: ListItemModel[] = [];
  @Input() errorState: CheckFormControlForError;
  form: FormGroup;
  passwordFormControlArray: FormArray;
  formControls: typeof DeviceInfoFormControlsEnum = DeviceInfoFormControlsEnum;
  autoCompleteFilteredOptions: Observable<ListItemModel[]>;

  faCoffee = 'faCoffee';

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  onModelChange: (_: any) => void = () => {};

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {}

  validate(): ValidationErrors | null {
    return this.form.invalid ? { required: true } : null;
  }

  writeValue(deviceInfoCustomFormControlValue: DeviceInfoInterface): void {
    if (deviceInfoCustomFormControlValue) {
      this.form.patchValue(deviceInfoCustomFormControlValue, { emitEvent: false });
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      [DeviceInfoFormControlsEnum.deviceType]: new FormControl(null, [Validators.required]),
      [DeviceInfoFormControlsEnum.deviceBrand]: new FormControl(null, [Validators.required]),
      [DeviceInfoFormControlsEnum.deviceModel]: new FormControl(null, [Validators.required]),
      [DeviceInfoFormControlsEnum.deviceStateDescription]: new FormControl(null),
      [DeviceInfoFormControlsEnum.deviceDefectDescription]: new FormControl(null),
      [DeviceInfoFormControlsEnum.isHasPassword]: new FormControl(false),
      [DeviceInfoFormControlsEnum.password]: new FormArray([])
    });

    this.passwordFormControlArray = this.form.get(this.formControls.password) as FormArray;

    this.subscribeForFormChanges();
    this.subscribeForAutoCompleteValueChanges();
    this.subscribeForIfShowPasswordControl();
  }

  subscribeForFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      // console.log(value);
      this.onModelChange(this.form.getRawValue());
    });
  }

  subscribeForIfShowPasswordControl(): void {
    this.form
      .get(this.formControls.isHasPassword)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((isShowPasswordInput) => {
        this.renderPasswordInput(isShowPasswordInput);
      });
  }

  subscribeForAutoCompleteValueChanges(): void {
    this.autoCompleteFilteredOptions = this.form.get(this.formControls.deviceBrand).valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : value.listItemValue)),
      map((value) => (value ? this.filterAutoCompleteOptions(value) : this.brandsList.slice()))
    );
  }

  renderPasswordInput(isShowPasswordInput: boolean): void {
    isShowPasswordInput
      ? this.passwordFormControlArray.push(new FormControl(''))
      : this.passwordFormControlArray.clear();
  }

  displayFn(deviceBrand: ListItemModel): string {
    return deviceBrand && deviceBrand.listItemValue ? deviceBrand.listItemValue : '';
  }

  private filterAutoCompleteOptions(optionValue: string): ListItemModel[] {
    // console.log(optionValue);
    const filterValue = optionValue.toLowerCase();

    return this.brandsList.filter((option) => option.listItemValue.toLowerCase().indexOf(filterValue) === 0);
  }
}
