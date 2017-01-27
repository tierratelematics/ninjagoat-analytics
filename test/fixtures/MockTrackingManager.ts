import {ITrackingManager} from "../../scripts/interfaces/ITrackingManager";

export class MockTrackingManager implements ITrackingManager{

    forPage(path: string) {
    }

    forEventOf(event: Object) {
    }

    forEvent(category: string, action: string, label: string, value: any) {
    }

    initialize() {
    }
}