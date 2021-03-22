import {isNotDefined} from './utils';

export namespace Throw {
  export function IfNotDefined(value: any, message: string): void {
    if (isNotDefined(value)) {
      throw new Error(message);
    }
  }
}
