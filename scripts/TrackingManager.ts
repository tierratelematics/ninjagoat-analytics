import {ITrackingManager} from "./interfaces/ITrackingManager";
import {multiInject, injectable} from "inversify";
import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import {forEach} from "lodash";

@injectable()
class TrackingManager implements ITrackingManager {

    constructor(@multiInject("IAnalyticsProvider") private analyticsProviders: IAnalyticsProvider[]) {
    }

    forPage(path: string) {
        forEach(this.analyticsProviders, (tracker: IAnalyticsProvider) => tracker.forPage(path));
    }

    forEvent(event: Object) {
        forEach(this.analyticsProviders, (tracker: IAnalyticsProvider) => tracker.forEvent(event));
    }

    forEventWith(category: string, action: string, label: string, value: any) {
        forEach(this.analyticsProviders, (tracker: IAnalyticsProvider) => tracker.forEventWith(category, action, label, value));
    }

    initialize() {
        forEach(this.analyticsProviders, (tracker: IAnalyticsProvider) => tracker.initialize());
    }
}

export default TrackingManager;