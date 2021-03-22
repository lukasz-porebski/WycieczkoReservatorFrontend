interface String {
  some(func: (value: string) => boolean): boolean;
  isWhiteSpace(): boolean;
  isLowerCase(): boolean;
  isUpperCase(): boolean;
  isNumber(): boolean;
  contains(element: string): boolean;
  toCamelCase(): string;
  toSnakeCase(): string;
}
