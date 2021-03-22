import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AppModalModel } from './models/app-modal.model';
import { isDefined } from '../../../utils/utils';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: [ './app-modal.component.scss' ]
})
export class AppModalComponent implements OnInit, OnDestroy {
  @Input() configuration: AppModalModel;

  constructor(private readonly _renderer2: Renderer2) {
  }

  ngOnInit() {
    if (this.configuration?.modalMaxWidth) {
      this.turnOnMaxModalWidth();
    }
  }

  ngOnDestroy() {
    if (this.configuration?.modalMaxWidth) {
      this.turnOffMaxModalWidth();
    }
  }

  public turnOnMaxModalWidth(): void {
    const body = this._getBody();
    if (isDefined(body)) {
      this._renderer2.addClass(body, 'max-modal-width');
    }
  }

  public turnOffMaxModalWidth(): void {
    const body = this._getBody();
    if (isDefined(body)) {
      this._renderer2.removeClass(body, 'max-modal-width');
    }
  }

  private _getBody(): HTMLBodyElement {
    const body = document.getElementsByTagName('body');

    return isDefined(body) && isDefined(body[0])
      ? body[0]
      : null;
  }
}
