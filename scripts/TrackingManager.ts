import {ITrackingManager} from "./interfaces/ITrackingManager";
import {multiInject, injectable} from "inversify";
import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import {forEach, isString} from "lodash";

@injectable()
class TrackingManager implements ITrackingManager {

    constructor(@multiInject("IAnalyticsProvider") private analyticsProviders: IAnalyticsProvider[]) {
    }

    trackPage(path: string) {
        forEach(this.analyticsProviders, (p: IAnalyticsProvider) => p.trackPage(path));
    }

    trackEvent(params: Object);
    trackEvent(category: string, action: string, label: string, value: any);
    trackEvent(paramsOrCategory: Object | string, action?: string, label?: string, value?: any) {
        forEach(this.analyticsProviders, (p: IAnalyticsProvider) => {
            (isString(paramsOrCategory)) ? p.trackEvent(paramsOrCategory, action, label, value) : p.trackEvent(paramsOrCategory);
        });
    }

    initialize() {
        forEach(this.analyticsProviders, (p: IAnalyticsProvider) => p.initialize());
    }
}

export default TrackingManager;