import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@share/modals';
import { ConfirmModalParamsModel } from '@share/modals/models';
import { Observable } from 'rxjs';

@Injectable()
export class ShareModalsProviderService {
  constructor(private dialogRef: MatDialog) {}

  openConfirmModal(confirmParams: ConfirmModalParamsModel): Observable<MatDialog> {
    const dialogRef = this.dialogRef.open(ConfirmModalComponent, {
      width: '500px',
      maxHeight: '250px',
      hasBackdrop: true
    });

    dialogRef.componentInstance.confirmTitle = confirmParams.confirmTitle;
    dialogRef.componentInstance.confirmDescription = confirmParams.confirmDescription;

    return dialogRef.afterClosed();
  }
}
