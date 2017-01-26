import {ITrackingManager} from "../../scripts/interfaces/ITrackingManager";

export class MockTrackingManager implements ITrackingManager{

    trackPage(path: string) {
    }

    trackEvent(params: Object)
    trackEvent(category: string, action: string, label: string, value: any)
    trackEvent(paramsOrCategory: Object|string, action?: string, label?: string, value?: any) {

    }

    initialize(){
    }
}