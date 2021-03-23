import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { DeviceInfoFormControlsEnum } from '../../enums/device-info-form-controls.enum';
import { DeviceTypeModel } from '@core/models/device-type.model';
import { Unsubscriber } from '@core/classes';
import { takeUntil } from 'rxjs/operators';
import { DeviceInfoInterface } from '../../interfaces';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceInfoComponent),
      multi: true
    }
  ]
})
export class DeviceInfoComponent extends Unsubscriber implements OnInit, ControlValueAccessor {
  @Input() deviceTypes: DeviceTypeModel[] = [];
  @Input() isRemoveControlButtonDisabled = true;
  @Output() removeControl: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  passwordFormControlArray: FormArray;
  formControls: typeof DeviceInfoFormControlsEnum = DeviceInfoFormControlsEnum;
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

  writeValue(deviceInfoCustomFormControlValue: DeviceInfoInterface): void {
    if (deviceInfoCustomFormControlValue) {
      this.form.patchValue(deviceInfoCustomFormControlValue, { emitEvent: false });
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      [DeviceInfoFormControlsEnum.deviceType]: new FormControl(null),
      [DeviceInfoFormControlsEnum.deviceModel]: new FormControl(null),
      [DeviceInfoFormControlsEnum.deviceStateDescription]: new FormControl(null),
      [DeviceInfoFormControlsEnum.deviceDefectDescription]: new FormControl(null),
      [DeviceInfoFormControlsEnum.isHasPassword]: new FormControl(true),
      [DeviceInfoFormControlsEnum.password]: new FormArray([])
    });

    this.passwordFormControlArray = this.form.get(this.formControls.password) as FormArray;

    this.subscribeForFormChanges();
    this.subscribeForIfShowPasswordControl();
  }

  subscribeForFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.onModelChange(this.form.getRawValue());
    });
  }

  subscribeForIfShowPasswordControl(): void {
    this.form
      .get(this.formControls.isHasPassword)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((isShowPasswordInput) => {
        console.log(this.passwordFormControlArray.value.length);
        this.renderPasswordInput(isShowPasswordInput);
      });
  }

  renderPasswordInput(isShowPasswordInput: boolean): void {
    // if (isShowPasswordInput) {
    //   this.passwordFormControlArray.push(new FormControl(''));
    // } else {
    //   if (this.passwordFormControlArray.value.length !== 0) {
    //     this.passwordFormControlArray.clear();
    //   }
    // }

    isShowPasswordInput
      ? this.passwordFormControlArray.push(new FormControl(''))
      : this.passwordFormControlArray.clear();
  }

  removeFormControl(): void {
    this.removeControl.emit();
  }
}
