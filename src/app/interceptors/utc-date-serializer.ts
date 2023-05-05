import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable, map } from 'rxjs';

/** Inspect response body,
 *  strip the time component (including timezone) off any dates,
 *  and return only the date component in UTC
 *  except if the property name includes 'time'*/

@Injectable()
export class UTCDateSerializer implements HttpInterceptor {
    //regex for ISO8601 date format
    iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            map(event => {
                if (event instanceof HttpResponse) {
                    let newBody = this.removeTime(event.clone().body);
                    let newResponse = event.clone({ body: newBody })
                    return newResponse;
                }
                else {
                    return event;
                }
            })
        )
    }

    removeTime(body: any): any {
        if (body === null || body === undefined) {
            return body;
        }

        if (typeof body !== 'object') {
            return body;
        }

        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isIso8601(value)) {
                if (!key.includes('time')) {
                    body[key] = this.removeTimeFromDate(new Date(value));
                }
            } else if (typeof value === 'object') {
                this.removeTime(value);
            }
        }
        return body;
    }

    isIso8601(value: string) {
        if (value === null || value === undefined) {
            return false;
        }

        return this.iso8601.test(value);
    }

    private removeTimeFromDate(date?: Date): String | undefined {
        if (date) {
            let returnDate: Date = new Date(date.toUTCString());
            let dateString = returnDate.getUTCFullYear().toString() + '-';
            dateString += (returnDate.getUTCMonth() + 1).toString().padStart(2, '0') + '-';
            dateString += returnDate.getUTCDate().toString().padStart(2, '0');
            return dateString;
        }
        else {
            return undefined;
        }
    }
}