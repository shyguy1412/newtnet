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
}