export interface IAppTableFilterConfiguration {
  placeholder?: string;
}

export class AppTableFilterModel {
  public placeholder: string;

  constructor(configuration: IAppTableFilterConfiguration) {
    this.placeholder = configuration.placeholder;
  }
}
