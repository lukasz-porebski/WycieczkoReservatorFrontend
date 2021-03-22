export abstract class ErrorTranslator {
  public static getErrorsTranslateRoutes(errors: string[]): string[] {
    return errors.map(e => this.getErrorTranslateRoute(e));
  }

  public static getErrorTranslateRoute(error: string): string {
    const errorPieces = error.split('-');

    const errorModule = errorPieces[0];
    const errorLayer = errorPieces[1];
    const errorNumber = errorPieces[2];

    return 'ERRORS.' + errorModule.toUpperCase() + '.' + errorLayer.toUpperCase() + '.' + errorNumber;
  }
}
