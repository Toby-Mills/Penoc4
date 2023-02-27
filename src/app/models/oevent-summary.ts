import {OEvent} from './oevent.model'
import { CourseResults } from './course-results';

export class OEventSummary {
    oEvent?: OEvent;
    courseResults: Array<CourseResults>=[];
}
