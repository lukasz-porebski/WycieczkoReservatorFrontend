import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AppButtonModel } from './models/app-button.model';
import { AppButtonColor } from './enums/app-button-color.enum';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: [ './app-button.component.scss' ]
})
export class AppButtonComponent {
  @ViewChild('appButton') appButton: ElementRef;
  @ViewChild('appButtonStepper') appButtonStepper: ElementRef;

  @Input() configuration: AppButtonModel;
  @Input() disabled = false;

  public get matColor(): string {
    return this.configuration.color === AppButtonColor.Accent || this.configuration.color === AppButtonColor.Primary
      ? this.configuration.color
      : '';
  }

  public click(): void {
    if (this.configuration?.matStepperNext) {
      this.appButtonStepper?.nativeElement?.click();
    } else {
      this.appButton?.nativeElement?.click();
    }
  }
}
