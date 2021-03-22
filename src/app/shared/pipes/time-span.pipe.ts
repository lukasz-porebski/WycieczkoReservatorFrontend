import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeSpan'
})
export class TimeSpanPipe extends DatePipe implements PipeTransform {

  // @ts-ignore
  public transform(seconds: number): string | null {
    const time = new Date(0, 0, 0);
    time.setSeconds(seconds);

    return super.transform(time, 'HH:mm:ss');
  }
}
