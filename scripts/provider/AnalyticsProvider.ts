import IAnalyticsProvider from "./IAnalyticsProvider";
import {inject, optional} from "inversify";
import UniversalAnalytics = require("universal-analytics");
import IAnalyticsConfig from "../IAnalyticsConfig";
import IPageViewArgs from "./IPageViewArgs";
import IEventArgs from "./IEventArgs";

class AnalyticsProvider implements IAnalyticsProvider {
    client: UniversalAnalytics.Client;

    constructor(@inject("IAnalyticsConfig") @optional() private config: IAnalyticsConfig = null) {
        this.initialize();
    }

    private initialize(): void {
        if (!this.config)
            throw(Error("analytic configs required"));

        if (!this.client)
            this.client = UniversalAnalytics(this.config.accountID, this.config.uuid, this.config.opts);
    }

    pageview(args: IPageViewArgs): void {
        this.client.pageview(args).send();
    }

    event(args: IEventArgs): void {
        this.client.event(args).send();
    }

}

export default AnalyticsProvider;