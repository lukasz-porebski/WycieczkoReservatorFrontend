import { Component, OnInit } from '@angular/core';
import { AppButtonModel } from '../../shared/components/wrappers/app-button/models/app-button.model';
import { AppButtonColor } from '../../shared/components/wrappers/app-button/enums/app-button-color.enum';
import { AuthenticationService } from '../../core/user-identity/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  public readonly translateRoute = 'MODULES.HOME.';

  public buttonConfig: AppButtonModel;
  public disablePage = false;

  constructor(private readonly _authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.buttonConfig = new AppButtonModel({
      color: AppButtonColor.Accent,
      label: {
        text: this.translateRoute + 'BUTTON'
      },
      onClick: () => {
        this.disablePage = true;
        this._authenticationService
          .generateUrlForCode()
          .subscribe(url => window.location.href = url);
      }
    });
  }

}
