export class EnumValidationPipe {
  constructor(private readonly enumType: any) {}

  transform(value: any) {
    if (!Object.values(this.enumType).includes(value)) {
      throw new Error(`Invalid value: ${value}.`);
    }

    return value;
  }
}
