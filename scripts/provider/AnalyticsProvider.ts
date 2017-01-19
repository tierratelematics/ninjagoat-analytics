import IAnalyticsProvider from "./IAnalyticsProvider";
import {inject, optional} from "inversify";
import IAnalyticsConfig from "../IAnalyticsConfig";
import {isString} from "lodash";
const universalAnalytics = require("universal-analytics");

class AnalyticsProvider implements IAnalyticsProvider {
    client: any;

    constructor(@inject("IAnalyticsConfig") private config: IAnalyticsConfig = null) {
        this.client = universalAnalytics(this.config.accountID, this.config.uuid, this.config.opts);
    }

    pageview(path: string) {
        this.client.pageview(path).send();
    }

    event(params: Object);
    event(category: string, action: string, label: string, value: any);
    event(paramsOrCategory: Object | string, action?: string, label?: string, value?: any){
        if(isString(paramsOrCategory))
            this.client.event(paramsOrCategory, action, label, value).send();
        else
            this.client.event(paramsOrCategory).send();
    }

}

export default AnalyticsProvider;