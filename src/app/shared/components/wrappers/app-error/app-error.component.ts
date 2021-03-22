import { Component, Input } from '@angular/core';
import { isNotEmpty } from '../../../utils/utils';

@Component({
  selector: 'app-error',
  templateUrl: './app-error.component.html',
  styleUrls: [ './app-error.component.scss' ]
})
export class AppErrorComponent {
  @Input() translateMessage = true;
  @Input() messages: string[] = [];

  public get isAnyMessage(): boolean {
    return isNotEmpty(this.messages);
  }

  public get isOnlyOneMessage(): boolean {
    return this.messages.length === 1;
  }
}
