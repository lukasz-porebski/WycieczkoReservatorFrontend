import { FormOfTransport } from '../enums/form-of-transport.enum';

export class FormOfTransportModel {
  constructor(public readonly value: FormOfTransport,
              public readonly text: string) {
  }
}
