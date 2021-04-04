import { Component, Input } from '@angular/core';
import { AppSelectModel } from './models/app-select-model';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: [ './app-select.component.scss' ]
})
export class AppSelectComponent {
  @Input() configuration: AppSelectModel;
}
