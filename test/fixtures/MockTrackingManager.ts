import {ITrackingManager} from "../../scripts/interfaces/ITrackingManager";

export class MockTrackingManager implements ITrackingManager{

    trackPage(path: string) {
    }

    trackEventOf(event: Object) {
    }

    trackEvent(category: string, action: string, label: string, value: any) {
    }

    initialize() {
    }
}