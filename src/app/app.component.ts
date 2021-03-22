import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import '../app/shared/extensions/string.extensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs([ 'pl' ]);
    translate.setDefaultLang('pl');
  }
}
