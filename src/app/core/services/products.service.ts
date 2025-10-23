import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LS_PRODUCTS_BASELINE, LS_PRODUCTS_WORKING } from '../constants/storage-keys';
import { Product } from '../models/product';
import { environment } from '../../../environments/environment';



function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/products`;

  private readonly productsSubject = new BehaviorSubject<Product[]>([]);
  readonly products$ = this.productsSubject.asObservable();

  readonly isLoading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new Subject<string>();

  private persistTimer: any;

  async init(): Promise<void> {
    this.isLoading$.next(true);
    try {
      const baseline = await firstValueFrom(this.http.get<Product[]>(this.apiUrl));
      this.setLocal(LS_PRODUCTS_BASELINE, baseline);

      const working = safeParse<Product[]>(localStorage.getItem(LS_PRODUCTS_WORKING)) ?? baseline;
      this.productsSubject.next(working);
      this.persist(); 
    } catch (err) {
      
      const cachedBaseline = safeParse<Product[]>(localStorage.getItem(LS_PRODUCTS_BASELINE));
      if (cachedBaseline) {
        this.productsSubject.next(cachedBaseline);
        this.error$.next('No se pudo actualizar desde la API; usando datos en caché.');
      } else {
        this.productsSubject.next([]); 
        this.error$.next(this.humanizeError(err));
      }
    } finally {
      this.isLoading$.next(false);
    }
  }

 
  resetWorking(): void {
    localStorage.removeItem(LS_PRODUCTS_WORKING);
  }

 
  create(p: Omit<Product, 'id'>): void {
    const list = [...this.productsSubject.value];
    const nextId = Math.max(0, ...list.map(x => x.id ?? 0)) + 1;
    list.unshift({ id: nextId, ...p });
    this.productsSubject.next(list);
    this.persist();
  }

  update(id: number, patch: Partial<Product>): void {
    const list = this.productsSubject.value.map(x => (x.id === id ? { ...x, ...patch } : x));
    this.productsSubject.next(list);
    this.persist();
  }

  delete(id: number): void {
    const list = this.productsSubject.value.filter(x => x.id !== id);
    this.productsSubject.next(list);
    this.persist();
  }

  getById(id: number): Product | null {
    return this.productsSubject.value.find(x => x.id === id) ?? null;
  }

  fetchById(id: number) {
  return this.http.get<Product>(`${environment.apiBaseUrl}/products/${id}`);
}


  // ---------- helpers
  private persist(): void {
    // 5) Debounce para no escribir en cada tecla
    clearTimeout(this.persistTimer);
    this.persistTimer = setTimeout(() => {
      this.setLocal(LS_PRODUCTS_WORKING, this.productsSubject.value);
    }, 150);
  }

  private setLocal(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // cuota llena o deshabilitado: no romper la app
      this.error$.next('No fue posible persistir datos localmente.');
    }
  }

  private humanizeError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      return `HTTP ${err.status}: ${err.message || 'Error de red'}`;
    }
    return 'Error inesperado al cargar productos.';
    }
}
