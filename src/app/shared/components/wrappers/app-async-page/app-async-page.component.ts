import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-async-page',
  templateUrl: './app-async-page.component.html',
  styleUrls: [ './app-async-page.component.scss' ],
})
export class AppAsyncPageComponent {
  @Input() showSpinner = false;
}
