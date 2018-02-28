import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import {inject, injectable} from "inversify";
import IAnalyticsConfig from "./interfaces/IAnalyticsConfig";
import { initialize, pageview, event } from "react-ga";

@injectable()
class GoogleAnalyticsProvider implements IAnalyticsProvider {
    private client: any;

    constructor(@inject("IAnalyticsConfig") private config: IAnalyticsConfig) {
    }

    forPage(path: string) {
        pageview(path);
    }

    forEvent(category: string, action: string, label: string, value: any) {
        event({ category, action, label, value });
    }

    initialize() {
        initialize(this.config.accountID);
    }
}

export default GoogleAnalyticsProvider;