import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { Product, ProductModalData } from '../../core/models/product';
import { MatDialog } from '@angular/material/dialog';

import { ToastService } from '../../core/services/toast.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  private sub?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productsService: ProductsService,
    private readonly dialog: MatDialog,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.productsService.products$
      .pipe(map(list => list.find(p => p.id === id) ?? null))
      .subscribe(p => this.product = p);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  editProduct(): void {
    if (!this.product) return;
    const data: ProductModalData = { mode: 'edit', product: this.product };
    this.dialog.open(ProductModalComponent, { data, width: '640px' })
      .afterClosed()
      .subscribe(draft => {
        if (!draft) return;
        this.productsService.update(this.product!.id, draft);
        this.toast.success('Producto actualizado');
      });
  }

  deleteProduct(): void {
    if (!this.product) return;
    this.productsService.delete(this.product.id);
    this.toast.warning('Producto eliminado');
    this.goBack();
  }
}
