import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './component/error-dialog/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports:[ErrorDialogComponent,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
