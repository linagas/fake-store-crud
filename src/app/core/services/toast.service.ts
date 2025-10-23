import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private readonly snack: MatSnackBar) {}
  success(message: string) {
    this.snack.open(message, 'Cerrar', { duration: 2500 });
  }
  warning(message: string) {
    this.snack.open(message, 'Cerrar', { duration: 3500 });
  }
  error(message: string) {
    this.snack.open(message, 'Cerrar', { duration: 5000 });
  }
}
