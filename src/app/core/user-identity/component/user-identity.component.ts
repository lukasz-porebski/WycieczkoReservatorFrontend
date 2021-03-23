import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouting } from '../../configurations/routing/app-routing';

@Component({
  selector: 'app-user-identity',
  templateUrl: './user-identity.component.html',
  styleUrls: [ './user-identity.component.scss' ]
})
export class UserIdentityComponent implements OnInit {
  public readonly translateRoute = 'CORE.USER_IDENTITY.';

  constructor(private readonly _authenticationService: AuthenticationService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const code = this._activatedRoute.snapshot.queryParams.code;
    this._authenticationService
      .logIn(code, null)
      .subscribe(() => this._router.navigateByUrl(AppRouting.home.root));
  }
}
