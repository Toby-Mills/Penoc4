export class OEvent {
    id?:number;
    name?: string;
    venueId?: number;
    venue?: string;
    date: Date = new Date();
    courses?: string;
    planner?: string;
    plannerId?: number;
    controller?: string;
    controllerId?: number;
    plannerReport?: string;
    controllerReport?: string;
    specialNote?: string;
    registrationTime?: string;
    startTime?: string;
    closeTime?: string;
    directions?: string;
    maxPoints?: number;
    organizingClub?: string;
    organizingClubId?: number;
    cost?: string;
    coordinateLatitude?: number;
    coordinateLongitude?: number;
}
