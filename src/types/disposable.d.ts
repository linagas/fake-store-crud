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
