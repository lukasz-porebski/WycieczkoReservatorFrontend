import { UserRole } from '../../core/user-identity/enums/user-role.enum';
import { FormOfTransport } from '../../modules/_domain-common/enums/form-of-transport.enum';

export abstract class EnumTransformer {
  public static ToUserRole(userRoleFromApiResponse: string): UserRole {
    switch (userRoleFromApiResponse) {
      case 'ROLE_USER':
        return UserRole.User;
      case 'ROLE_TRIPS_GUIDE':
        return UserRole.Guide;
      case 'ROLE_ADMIN':
        return UserRole.Admin;
      default:
        console.error('Unknown user role:', userRoleFromApiResponse);
        return -1;
    }
  }

  public static ToApiRequestUserRole(role: UserRole): string {
    switch (role) {
      case UserRole.User:
        return 'ROLE_USER';
      case UserRole.Guide:
        return 'ROLE_TRIPS_GUIDE';
      case UserRole.Admin:
        return 'ROLE_ADMIN';
    }
  }

  public static ToFormOfTransport(formOfTransportFromApiResponse: string): FormOfTransport {
    switch (formOfTransportFromApiResponse) {
      case 'BUS':
        return FormOfTransport.Bus;
      case 'PLANE':
        return FormOfTransport.Plane;
      default:
        console.error('Unknown form of transport:', formOfTransportFromApiResponse);
        return -1;
    }
  }

  public static ToApiRequestFormOfTransport(formOfTransport: FormOfTransport): string {
    const formOfTransportAsString = FormOfTransport[formOfTransport] as string;
    return formOfTransportAsString.toUpperCase();
  }
}
