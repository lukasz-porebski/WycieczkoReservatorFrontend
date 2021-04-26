import { HttpErrorResponse } from '@angular/common/http';
import { isDefined, isNotDefined } from './utils';

class ErrorMessageModel {
  message: string;
}

export abstract class ErrorHelper {
  public static extractSingleMessageAsCollection(error: HttpErrorResponse): string[] {
    const message = ErrorHelper.extractMessage(error);
    return isDefined(message) ? [ message ] : [];
  }

  public static extractMessage(error: HttpErrorResponse): string {
    if (isNotDefined(error?.error)) {
      return null;
    }

    const model = JSON.parse(`{${error.error}}`) as ErrorMessageModel;
    return model?.message;
  }
}
