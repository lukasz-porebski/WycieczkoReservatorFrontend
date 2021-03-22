import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { isNotEmpty } from '../utils/utils';

@Pipe({
  name: 'conditionalTranslation'
})
export class ConditionalTranslationPipe extends TranslatePipe implements PipeTransform {
  public transform(value: string, ...args: unknown[]): unknown {
    return isNotEmpty(args) && args[0] === false
      ? value
      : super.transform(value);
  }

}
