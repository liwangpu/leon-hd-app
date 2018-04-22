import { Injectable } from '@angular/core';
import { DatePipe } from "@angular/common";
@Injectable()
export class MomentService {

    constructor(private datePipe: DatePipe) {

    }

    addDays(time: Date, num: number): Date {
        time.setDate(time.getDate() + num);
        return time;
    }

    addYears(time: Date, num: number) {
        time.setFullYear(time.getFullYear() + num);
        return time;
    }

    addYearsTransform(time: Date, num: number, expression: string): string {
        let d = this.addYears(time, num);
        return this.datePipe.transform(d, expression);
    }

    addDaysTransform(time: Date, num: number, expression: string): string {
        let d = this.addDays(time, num);
        return this.datePipe.transform(d, expression);
    }
}