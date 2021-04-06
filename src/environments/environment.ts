import { DevelopmentEnvironmentMode } from './development-environment-mode.enum';
import { UserRole } from '../app/core/user-identity/enums/user-role.enum';

const mode = DevelopmentEnvironmentMode.FullAccess;

function isLoggedInMode(mode: DevelopmentEnvironmentMode): boolean {
  switch (mode) {
    case DevelopmentEnvironmentMode.Prod:
      return false;
    case DevelopmentEnvironmentMode.FullAccess:
      return false;
    case DevelopmentEnvironmentMode.UserLoggedIn:
      return true;
    case DevelopmentEnvironmentMode.GuideLoggedIn:
      return true;
    case DevelopmentEnvironmentMode.AdminLoggedIn:
      return true;
  }
}

function userRole(mode: DevelopmentEnvironmentMode): UserRole {
  switch (mode) {
    case DevelopmentEnvironmentMode.UserLoggedIn:
      return UserRole.User;
    case DevelopmentEnvironmentMode.GuideLoggedIn:
      return UserRole.Guide;
    case DevelopmentEnvironmentMode.AdminLoggedIn:
      return UserRole.Admin;
    default:
      return null;
  }
}

export const environment = {
  production: false,
  apiUrl: 'https://localhost:12345',
  appUrl: 'http://localhost:4200',
  mode: mode,
  autoLogIn: isLoggedInMode(mode),
  userRole: userRole(mode)
};
