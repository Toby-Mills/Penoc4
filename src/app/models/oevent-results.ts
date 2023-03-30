import {OEvent} from './oevent.model'
import { CourseResults } from './course-results';

export class OEventResults {
    oEvent?: OEvent;
    courseResults: Array<CourseResults>=[];
}
