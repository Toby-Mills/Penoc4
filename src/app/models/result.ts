export class Result {
    courseId?: number;
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
