export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: T | string | null;
  private _value?: T;

  private constructor(isSuccess: boolean, error: T | string | null, value?: T) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this._value!;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}
