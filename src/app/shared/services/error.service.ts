import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isDefined, isNotDefined } from '../utils/utils';

class CustomErrorInfo {
  message: string = null;
  errorCode: number = null;
}

class DefaultErrorInfo {
  message: string = null;
}

@Injectable({
  providedIn: SharedModule
})
export class ErrorService {
  constructor(private readonly _translateService: TranslateService) {
  }

  public extractSingleMessageAsCollection(error: HttpErrorResponse): string[] {
    const message = this.extractMessage(error);
    return isDefined(message) ? [ message ] : [];
  }

  public extractMessage(error: HttpErrorResponse): string {
    if (isNotDefined(error?.error)) {
      return null;
    }

    const errorModel = this._getErrorInfo(error.error);
    if (isNotDefined(errorModel)) {
      return null;
    }

    if (errorModel instanceof DefaultErrorInfo) {
      return errorModel.message;
    } else {
      const translateRoute = this._getTranslateRoute(errorModel);
      return this._translateService.instant(translateRoute);
    }
  }

  private _getErrorInfo(error: any): CustomErrorInfo | DefaultErrorInfo {
    const castedCustomErrorInfo = error as CustomErrorInfo;
    if (isDefined(castedCustomErrorInfo?.errorCode)) {
      const customErrorInfo = new CustomErrorInfo();
      customErrorInfo.message = castedCustomErrorInfo.message;
      customErrorInfo.errorCode = castedCustomErrorInfo.errorCode;

      return customErrorInfo;
    }

    let jsonString = error;
    if (this._isJson(jsonString)) {
      const castedJsonCustomErrorInfo = JSON.parse(jsonString) as CustomErrorInfo;
      if (isDefined(castedJsonCustomErrorInfo?.errorCode)) {
        const customErrorInfo = new CustomErrorInfo();
        customErrorInfo.message = castedJsonCustomErrorInfo.message;
        customErrorInfo.errorCode = castedJsonCustomErrorInfo.errorCode;

        return customErrorInfo;
      }
    }

    jsonString = `{${error}}`;
    if (this._isJson(jsonString)) {
      const castedJsonCustomErrorInfo = JSON.parse(jsonString) as CustomErrorInfo;
      if (isDefined(castedJsonCustomErrorInfo?.errorCode)) {
        const customErrorInfo = new CustomErrorInfo();
        customErrorInfo.message = castedJsonCustomErrorInfo.message;
        customErrorInfo.errorCode = castedJsonCustomErrorInfo.errorCode;

        return customErrorInfo;
      }
    }

    const defaultErrorInfo = new DefaultErrorInfo();
    defaultErrorInfo.message = 'Błąd';
    if (this._isJson(jsonString)) {
      const castedDefaultErrorInfo = JSON.parse(jsonString) as DefaultErrorInfo;
      defaultErrorInfo.message = castedDefaultErrorInfo?.message;
    }

    return defaultErrorInfo;
  }

  private _getTranslateRoute(errorInfo: CustomErrorInfo): string {
    return `ERROR_CODES.${errorInfo.errorCode}`;
  }

  private _isJson(str: any): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
