import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.css']
})
export class InputTimeComponent {
  @Input() public time: Date = new Date();
  @Output() public timeChange: EventEmitter<Date> = new EventEmitter();
  public valid: boolean = true;

  public updateTime($event: any) {
    const element = $event.currentTarget as HTMLInputElement;
    const timeString = element.value;
    const time: Date | undefined = this.parseTimeString(timeString);
    if (time) {
      this.valid = true;
      this.time = time;
      this.timeChange.emit(new Date(time.toUTCString()));
    } else {
      this.valid = false;
    }
  }

  private parseTimeString(input: string): Date | undefined {

    const noColons: string = input.replace(/:/g, '');
    if (/^[0-9]{1,6}$/.test(noColons)) {
      const paddedString = noColons.padStart(6, '0');
      const formattedString = paddedString.replace(/(\d{2})(?=\d)/g, '$1:');
      const newDate = new Date(Date.parse(`1970-01-01T${formattedString}Z`))
      return newDate;
    } else {
      return undefined;
    }
  }
}