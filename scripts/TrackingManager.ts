import {ITrackingManager} from "./interfaces/ITrackingManager";
import {multiInject, injectable} from "inversify";
import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import {forEach} from "lodash";

@injectable()
class TrackingManager implements ITrackingManager {

    constructor(@multiInject("IAnalyticsProvider") private analyticsProviders: IAnalyticsProvider[]) {
    }

    trackPage(path: string) {
        forEach(this.analyticsProviders, (provider: IAnalyticsProvider) => provider.trackPage(path));
    }

    trackEventOf(event: Object) {
        forEach(this.analyticsProviders, (provider: IAnalyticsProvider) => provider.trackEventOf(event));
    }

    trackEvent(category: string, action: string, label: string, value: any) {
        forEach(this.analyticsProviders, (provider: IAnalyticsProvider) => provider.trackEvent(category, action, label, value));
    }

    initialize() {
        forEach(this.analyticsProviders, (provider: IAnalyticsProvider) => provider.initialize());
    }
}

export default TrackingManager;