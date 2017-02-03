import {ITrackingManager} from "../../scripts/interfaces/ITrackingManager";

export class MockTrackingManager implements ITrackingManager{

    forPage(path: string) {
    }

    forEvent(event: Object) {
    }

    forEventWith(category: string, action: string, label: string, value: any) {
    }

    initialize() {
    }
}