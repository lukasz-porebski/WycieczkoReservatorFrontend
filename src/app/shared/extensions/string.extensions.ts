import { Lodash, Validator } from '../utils/external';

String.prototype.some = function(this: string, func: (value: string) => boolean): boolean {
  return this.split('').some(func);
};

String.prototype.isWhiteSpace = function(this: string): boolean {
  return /^\s*$/.test(this);
};

String.prototype.isLowerCase = function(this: string): boolean {
  return Validator.isLowercase(this);
};

String.prototype.isUpperCase = function(this: string): boolean {
  return Validator.isUppercase(this);
};

String.prototype.isNumber = function(this: string): boolean {
  return Validator.isNumeric(this);
};

String.prototype.contains = function(this: string, element: string): boolean {
  return Validator.contains(this, element);
};

String.prototype.toCamelCase = function(this: string): string {
  return Lodash.camelCase(this);
};

String.prototype.toSnakeCase = function(this: string): string {
  return Lodash.snakeCase(this);
};
