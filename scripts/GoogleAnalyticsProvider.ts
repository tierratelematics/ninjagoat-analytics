import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import {inject, injectable} from "inversify";
import IAnalyticsConfig from "./interfaces/IAnalyticsConfig";
import {isString} from "lodash";
const universalAnalytics = require("universal-analytics");

@injectable()
class GoogleAnalyticsProvider implements IAnalyticsProvider {
    client: any;

    constructor(@inject("IAnalyticsConfig") private config: IAnalyticsConfig) {
    }

    trackPage(path: string) {
        this.client.trackPage(path).send();
    }

    trackEvent(params: Object);
    trackEvent(category: string, action: string, label: string, value: any);
    trackEvent(paramsOrCategory: Object | string, action?: string, label?: string, value?: any) {
        if (isString(paramsOrCategory)) {
            this.client.trackEvent(paramsOrCategory, action, label, value).send();
        } else {
            this.client.trackEvent(paramsOrCategory).send();
        }
    }

    initialize() {
        this.client = universalAnalytics(this.config.accountID);
    }
}

export default GoogleAnalyticsProvider;