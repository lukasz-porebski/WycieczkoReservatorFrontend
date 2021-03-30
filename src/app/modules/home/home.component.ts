import { Component, OnInit } from '@angular/core';
import { AppButtonModel } from '../../shared/components/wrappers/app-button/models/app-button.model';
import { AppButtonColor } from '../../shared/components/wrappers/app-button/enums/app-button-color.enum';
import { AuthenticationService } from '../../core/user-identity/services/authentication.service';
import { Router } from '@angular/router';
import { AppRouting } from '../../core/configurations/routing/app-routing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  public readonly translateRoute = 'MODULES.HOME.';

  public buttonConfig: AppButtonModel;
  public disablePage = false;

  constructor(private readonly _authenticationService: AuthenticationService,
              private readonly _router: Router) {
  }

  ngOnInit(): void {
    this.buttonConfig = new AppButtonModel({
      color: AppButtonColor.Accent,
      label: {
        text: this.translateRoute + 'BUTTON'
      },
      onClick: () => {
        this.disablePage = true;
        this._router.navigateByUrl(AppRouting.user.logIn.absolutePath);
        // this._authenticationService
        //   .generateUrlForCode()
        //   .subscribe(url => window.location.href = url);
      }
    });
  }

}
