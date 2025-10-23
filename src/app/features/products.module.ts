import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { ProductsComponent } from './products/products.component';
import { ProductModalComponent } from './product-modal/product-modal.component'
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductModalComponent,
    ConfirmDeleteModalComponent,
    ProductModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule {}
