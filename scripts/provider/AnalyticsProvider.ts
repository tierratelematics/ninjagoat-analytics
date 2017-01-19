import IAnalyticsProvider from "./IAnalyticsProvider";
import {inject, injectable} from "inversify";
import IAnalyticsConfig from "../IAnalyticsConfig";
import {isString} from "lodash";
const universalAnalytics = require("universal-analytics");

@injectable()
class AnalyticsProvider implements IAnalyticsProvider {
    client: any;

    constructor(@inject("IAnalyticsConfig") private config: IAnalyticsConfig) {
    }

    pageview(path: string) {
        this.client.pageview(path).send();
    }

    event(params: Object);
    event(category: string, action: string, label: string, value: any);
    event(paramsOrCategory: Object | string, action?: string, label?: string, value?: any) {
        if (isString(paramsOrCategory))
            this.client.event(paramsOrCategory, action, label, value).send();
        else
            this.client.event(paramsOrCategory).send();
    }

    initialize() {
        this.client = universalAnalytics(this.config.accountID);
    }
}

export default AnalyticsProvider;