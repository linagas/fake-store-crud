import { Component, OnInit, Inject  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModalData } from 'src/app/core/models/product';



@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
readonly mode = this.data.mode;

  // Naming claro: 'productForm' con controles del dominio
  readonly productForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    category: ['', [Validators.required]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
    description: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModalData
  ) {
    if (data.mode === 'edit' && data.product) {
      const { title, price, category, image, description } = data.product;
      this.productForm.patchValue({ title, price, category, image, description: description ?? '' });
    }
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    
    this.dialogRef.close(this.productForm.value);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }


  get titleCtrl() { return this.productForm.controls.title; }
  get priceCtrl() { return this.productForm.controls.price; }
  get categoryCtrl() { return this.productForm.controls.category; }
  get imageCtrl() { return this.productForm.controls.image; }
  get descriptionCtrl() { return this.productForm.controls.description; }
}
