import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewOrderModalFormControlsEnum } from '../../enums';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckFormControlForError, Unsubscriber } from '@core/classes';
import { ListItemModel } from '@core/models/device-type.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DeviceInfoInterface } from '../../interfaces';

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
  deviceInfoControlDefaultValue: DeviceInfoInterface = {
    deviceType: 0,
    deviceBrandId: null,
    deviceModel: '',
    deviceStateDescription: '',
    deviceDefectDescription: '',
    isHasPassword: false,
    password: ['']
  };
  deviceTypes: ListItemModel[] = [];
  brandsList: ListItemModel[] = [];
  orderStatusItems: ListItemModel[] = [];
  workersList: ListItemModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewOrderModalComponent>,
    private store: AngularFirestore
  ) {
    super();
  }

  ngOnInit(): void {
    console.log(this.dialogData);
    this.deviceTypes = this.dialogData.deviceTypes;
    this.orderStatusItems = this.dialogData.orderStatusItems;
    this.workersList = this.dialogData.workersList;
    this.brandsList = this.dialogData.brandsList;

    this.initForm();
    // this.store.collection('deviceTypes').valueChanges().subscribe(console.log);
  }

  initForm(): void {
    this.form = this.fb.group({
      [NewOrderModalFormControlsEnum.customerName]: new FormControl('', [Validators.required]),
      [NewOrderModalFormControlsEnum.customerPhoneNumber]: new FormControl('', [Validators.required]),
      [NewOrderModalFormControlsEnum.isCustomerHasViber]: new FormControl(false),
      [NewOrderModalFormControlsEnum.startDate]: new FormControl(moment(), [Validators.required]),
      [NewOrderModalFormControlsEnum.endDate]: new FormControl(''),
      [NewOrderModalFormControlsEnum.deviceInfo]: new FormControl(this.deviceInfoControlDefaultValue),
      [NewOrderModalFormControlsEnum.orderState]: new FormControl(0),
      [NewOrderModalFormControlsEnum.assignedWorker]: new FormControl(''),
      [NewOrderModalFormControlsEnum.isOrderUrgent]: new FormControl(false)
    });

    // this.form.valueChanges.subscribe((v) => console.log(v));

    // this.form
    //   .get(this.formControls.deviceType)
    //   .valueChanges.pipe(takeUntil(this.destroy$))
    //   .subscribe((currentSelectOption) => {
    //     this.currentDeviceType = this.deviceTypes.find(
    //       (deviceType) => deviceType.listItemId === currentSelectOption
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

  displayFn(item: ListItemModel): string {
    return `<mat-icon>${item.listItemIcon}</mat-icon><span>${item.listItemValue}</span>`;
  }

  // addDeviceInfoFormControl(): void {
  //   this.deviceInfoFormArray.push(new FormControl(this.deviceInfoControlDefaultValue));
  // }
  //
  // removeDeviceInfoControl(controlIndex: number): void {
  //   this.deviceInfoFormArray.removeAt(controlIndex);
  // }

  dateChangeHandler(value: Date): void {
    console.log(value);
  }
}
