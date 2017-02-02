import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import {inject, injectable} from "inversify";
import IAnalyticsConfig from "./interfaces/IAnalyticsConfig";
const universalAnalytics = require("universal-analytics");

@injectable()
class GoogleAnalyticsProvider implements IAnalyticsProvider {
    private client: any;

    constructor(@inject("IAnalyticsConfig") private config: IAnalyticsConfig) {
    }

    forPage(path: string) {
        this.client.trackPage(path).send();
    }

    forEvent(event: Object){
        this.client.trackEvent(event).send();
    }

    forEventWith(category: string, action: string, label: string, value: any){
        this.client.trackEvent(category, action, label, value).send();
    }

    initialize() {
        this.client = universalAnalytics(this.config.accountID);
    }
}

export default GoogleAnalyticsProvider;