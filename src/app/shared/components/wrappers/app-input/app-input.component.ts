import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { AppInputModel } from './models/app-input.model';
import { AppInputColor } from './enums/app-checkbox-input-color.enum';
import { AppInputBasicModel } from './models/input-types/app-input-basic.model';
import { AppInputTextAreaModel } from './models/input-types/app-input-text-area.model';
import { AppInputCheckboxModel } from './models/input-types/app-input-checkbox.model';
import { AppInputRadioButtonModel } from './models/input-types/app-input-radio-button.model';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: [ './app-input.component.scss' ]
})
export class AppInputComponent {
  @Input() configuration: AppInputModel;
  @Input() hintTemplate: TemplateRef<any>;

  @ViewChild('generalInputField') generalInputField: TemplateRef<any>;
  @ViewChild('textAreaInputField') textAreaInputField: TemplateRef<any>;

  public get basicInput(): AppInputBasicModel {
    return this.configuration?.input instanceof AppInputBasicModel
      ? this.configuration.input as AppInputBasicModel
      : null;
  }

  public get textAreaInput(): AppInputTextAreaModel {
    return this.configuration?.input instanceof AppInputTextAreaModel
      ? this.configuration.input as AppInputTextAreaModel
      : null;
  }

  public get checkboxInput(): AppInputCheckboxModel {
    return this.configuration?.input instanceof AppInputCheckboxModel
      ? this.configuration.input as AppInputCheckboxModel
      : null;
  }

  public get radioButtonInput(): AppInputRadioButtonModel<any> {
    return this.configuration?.input instanceof AppInputRadioButtonModel
      ? this.configuration.input as AppInputRadioButtonModel<any>
      : null;
  }

  public createLabel(): string {
    return this.configuration.label?.translate
      ? this.configuration.label.text + (this.configuration.label.disableConvention ? '' : 'FIELD_NAME')
      : this.configuration.label?.text;
  }


  public getCheckBoxColorClass(color: AppInputColor): string {
    return 'app-checkbox-input-' + color;
  }

  public getRadioButtonColorClass(color: AppInputColor): string {
    return 'app-radio-button-' + color;
  }
}
