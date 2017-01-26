import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import {inject, injectable} from "inversify";
import IAnalyticsConfig from "./interfaces/IAnalyticsConfig";
const universalAnalytics = require("universal-analytics");

@injectable()
class GoogleAnalyticsProvider implements IAnalyticsProvider {
    client: any;

    constructor(@inject("IAnalyticsConfig") private config: IAnalyticsConfig) {
    }

    trackPage(path: string) {
        this.client.trackPage(path).send();
    }

    trackEventOf(event: Object){
        this.client.trackEvent(event).send();
    }

    trackEvent(category: string, action: string, label: string, value: any){
        this.client.trackEvent(category, action, label, value).send();
    }

    initialize() {
        this.client = universalAnalytics(this.config.accountID);
    }
}

export default GoogleAnalyticsProvider;