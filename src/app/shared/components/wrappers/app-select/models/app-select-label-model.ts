export interface IAppSelectLabelConfiguration {
  text: string;
}

export class AppSelectLabelModel {
  public readonly text: string;

  constructor(configuration: IAppSelectLabelConfiguration) {
    this.text = configuration.text;
  }
}
