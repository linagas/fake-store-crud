// Declaraciones de tipos para Symbol.asyncDispose y Symbol.dispose
// Compatible con Angular 14 y TypeScript 4.7

export {}; 

declare global {
  interface SymbolConstructor {
    readonly asyncDispose: unique symbol;
    readonly dispose: unique symbol;
  }

  interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
  }

  interface Disposable {
    [Symbol.dispose](): void;
  }
}