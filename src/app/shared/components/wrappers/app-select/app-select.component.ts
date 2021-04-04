import { Component, Input } from '@angular/core';
import { AppSelectModel } from './models/app-select-model';
import { MultipleSelectAttribute } from '../../../attributes/select/multiple-select-attribute';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: [ './app-select.component.scss' ]
})
export class AppSelectComponent {
  @Input() configuration: AppSelectModel;

  public get isMultiple(): boolean {
    return this.configuration.attribute instanceof MultipleSelectAttribute;
  }
}
