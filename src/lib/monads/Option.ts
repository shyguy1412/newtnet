type TransformFunction<T> = (value: T | undefined | null, ...args: any[]) => T | undefined | null;

export class Option<T>{

  private value: T | undefined | null;

  constructor(value: T | undefined | null) {
    this.value = value;
  }

  run(transform: TransformFunction<T>, ...args: any[]) {
    if (this.value ?? false) {
      return this;
    }

    this.value = transform(this.value, ...args);
  }

  static destructure<T extends Object>(obj: T) {
    return Object.entries(obj)
      .map(([key, value]) => ({ [key as keyof T]: new Option(value) }))
      .reduce((prev, cur) => ({ ...prev, ...cur }), {}) as { [x in keyof T]: Option<typeof obj[x]> };
  }

} 