import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '@share/modals/confirm-modal/confirm-modal.component';
import { ShareModalsProviderService } from '@share/modals/share-modals-provider/share-modals-provider.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  entryComponents: [ConfirmModalComponent],
  providers: [ShareModalsProviderService]
})
export class ShareModalsModule {}
