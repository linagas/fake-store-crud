import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Product, ProductModalData } from 'src/app/core/models/product';

import { ProductsService } from 'src/app/core/services/products.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { FormControl } from '@angular/forms';


interface ProductsViewModel {
  isLoading: boolean;
  products: Product[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  searchControl = new FormControl<string>('', { nonNullable: true });
  productsViewModel$!: Observable<ProductsViewModel>;
  hoverTimers: Record<number, any> = {};
  hoveredCards: Record<number, boolean> = {};

  constructor(
    private readonly productsService: ProductsService,
    private readonly dialog: MatDialog,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.productsViewModel$ = combineLatest([
      this.productsService.isLoading$,
      this.productsService.products$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([isLoading, products, term]) => {
        const normalized = (term ?? '').trim().toLowerCase();
        const filtered = normalized
          ? products.filter(product =>
              (product.title + ' ' + product.category)
                .toLowerCase()
                .includes(normalized)
            )
          : products;
        return { isLoading, products: filtered };
      })
    );
  }

  openCreateProductDialog(): void {
    const data: ProductModalData = { mode: 'create' };
    this.dialog.open(ProductModalComponent, { data, width: '640px' })
      .afterClosed()
      .subscribe(draft => {
        if (!draft) return;
        this.productsService.create(draft);
        this.toast.success('Producto creado');
      });
  }

  openEditProductDialog(product: Product): void {
    const data: ProductModalData  = { mode: 'edit', product };
    this.dialog.open(ProductModalComponent, { data, width: '640px' })
      .afterClosed()
      .subscribe(draft => {
        if (!draft) return;
        this.productsService.update(product.id, draft);
        this.toast.success('Producto actualizado');
      });
  }

  confirmDeleteProduct(product: Product): void {
    this.dialog.open(ConfirmDeleteModalComponent, {
      data: {
        title: 'Eliminar producto',
        message: `¿Eliminar "${product.title}"?`
      }
    }).afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.productsService.delete(product.id);
      this.toast.warning('Producto eliminado');
    });
  }

  

startHover(id: number): void {
  this.cancelHover(id);
  this.hoverTimers[id] = setTimeout(() => {
    this.hoveredCards[id] = true;
  }, 2500); // 5 segundos
}

cancelHover(id: number): void {
  clearTimeout(this.hoverTimers[id]);
  this.hoveredCards[id] = false;
}

}
