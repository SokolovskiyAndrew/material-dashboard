import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewOrderModalFormControlsEnum } from '../../enums';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';
import { CheckFormControlForError, Unsubscriber } from '@core/classes';
import { DeviceTypeModel } from '@core/models/device-type.model';
import { SharedDataService } from '@core/services';

@Component({
  selector: 'app-new-order-modal',
  templateUrl: './new-order-modal.component.html',
  styleUrls: ['./new-order-modal.component.scss']
})
export class NewOrderModalComponent extends Unsubscriber implements OnInit {
  form: FormGroup;
  formControls: typeof NewOrderModalFormControlsEnum = NewOrderModalFormControlsEnum;
  expansionPanelStep = 0;
  errorStateMatcher: CheckFormControlForError = new CheckFormControlForError();
  deviceInfoFormArray: FormArray;
  deviceInfoControlDefaultValue = {
    deviceType: 0,
    deviceModel: '',
    deviceStateDescription: '',
    deviceDefectDescription: '',
    isHasPassword: false,
    password: ['']
  };
  deviceTypes: DeviceTypeModel[] = [];
  orderStatusItems: DeviceTypeModel[] = [];
  workersList: DeviceTypeModel[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewOrderModalComponent>,
    private sharedDataService: SharedDataService
  ) {
    super();
  }

  ngOnInit(): void {
    this.deviceTypes = this.sharedDataService.deviceTypeItemList;
    this.orderStatusItems = this.sharedDataService.orderStatusItemList;
    this.workersList = this.sharedDataService.workersList;

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      [NewOrderModalFormControlsEnum.customerName]: new FormControl('', [Validators.required]),
      [NewOrderModalFormControlsEnum.customerPhoneNumber]: new FormControl('', [Validators.required]),
      [NewOrderModalFormControlsEnum.isCustomerHasViber]: new FormControl(true),
      [NewOrderModalFormControlsEnum.startDate]: new FormControl(moment(), [Validators.required]),
      [NewOrderModalFormControlsEnum.endDate]: new FormControl(null),
      [NewOrderModalFormControlsEnum.deviceInfo]: new FormArray([
        new FormControl(this.deviceInfoControlDefaultValue)
      ]),
      // [NewOrderModalFormControlsEnum.deviceType]: new FormControl(0, [Validators.required]),
      // [NewOrderModalFormControlsEnum.deviceModel]: new FormControl('', [Validators.required]),
      // [NewOrderModalFormControlsEnum.deviceStateDescription]: new FormControl(''),
      // [NewOrderModalFormControlsEnum.defectDescription]: new FormControl(''),
      // [NewOrderModalFormControlsEnum.isHasPassword]: new FormControl(false),
      // [NewOrderModalFormControlsEnum.devicePassword]: new FormControl(''),
      [NewOrderModalFormControlsEnum.orderState]: new FormControl(0),
      [NewOrderModalFormControlsEnum.assignedWorker]: new FormControl(null),
      [NewOrderModalFormControlsEnum.isOrderUrgent]: new FormControl(false)
    });

    this.deviceInfoFormArray = this.form.get(this.formControls.deviceInfo) as FormArray;

    this.form.valueChanges.subscribe(() =>
      console.log(this.form.get(this.formControls.customerPhoneNumber).errors)
    );

    // this.form
    //   .get(this.formControls.deviceType)
    //   .valueChanges.pipe(takeUntil(this.destroy$))
    //   .subscribe((currentSelectOption) => {
    //     this.currentDeviceType = this.deviceTypes.find(
    //       (deviceType) => deviceType.typeId === currentSelectOption
    //     );
    //   });
  }

  setExpansionPanelStep(index: number): void {
    this.expansionPanelStep = index;
  }

  nextExpansionPanelStep(): void {
    this.expansionPanelStep++;
  }

  prevExpansionPanelStep(): void {
    this.expansionPanelStep--;
  }

  saveOrder(): void {
    this.errorStateMatcher.checkForm = true;

    console.log(this.form.valid);
    if (this.form.valid) {
      // this.dialogRef.disableClose = true;
      console.log(this.form.getRawValue());
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  displayFn(item: DeviceTypeModel): string {
    return `<mat-icon>${item.typeIcon}</mat-icon><span>${item.typeDescription}</span>`;
  }

  addDeviceInfoFormControl(): void {
    this.deviceInfoFormArray.push(new FormControl(this.deviceInfoControlDefaultValue));
  }

  removeDeviceInfoControl(controlIndex: number): void {
    this.deviceInfoFormArray.removeAt(controlIndex);
  }

  dateChangeHandler(value: Date): void {
    console.log(value);
  }
}
