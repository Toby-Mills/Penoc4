export class Result {
    eventId?: number;
    eventName?: string;
    eventDate?: Date;
    courseId?: number;
    courseName?: string;
    competitorId?: number;
    competitor?: string;
    position?: number;
    categoryId?: number;
    clubId?: number;
    time: Date = new Date();
    points: number = 0;
    raceNumber?: string;
    comment?: string;
    disqualified: boolean = false;
}
