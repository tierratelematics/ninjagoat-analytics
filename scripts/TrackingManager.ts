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

    forEvent(category: string, action: string, label: string, value: any, options?: any) {
        forEach(this.analyticsProviders, (tracker: IAnalyticsProvider) => tracker.forEvent(category, action, label, value, options));
    }

    initialize() {
        forEach(this.analyticsProviders, (tracker: IAnalyticsProvider) => tracker.initialize());
    }
}

export default TrackingManager;