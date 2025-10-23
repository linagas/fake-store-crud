import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductsService } from './core/services/products.service';
import { LS_PRODUCTS_WORKING } from './core/constants/storage-keys';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductsModule } from './features/products.module';

export function appInitFactory(products: ProductsService) {
  return async () => {
    products.resetWorking();  
    await products.init();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    ProductsModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [ProductsService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
