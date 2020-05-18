import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import {inject, injectable} from "inversify";
import IAnalyticsConfig from "./interfaces/IAnalyticsConfig";
import {initialize, pageview, event, EventArgs} from "react-ga";


export interface IGoogleAnalyticsOptions {
    transport?: "beacon" | "image" | "xhr";
    nonInteraction?: boolean;
}

@injectable()
class GoogleAnalyticsProvider implements IAnalyticsProvider {
    private client: any;

    constructor(@inject("IAnalyticsConfig") private config: IAnalyticsConfig) {
    }

    forPage(path: string) {
        pageview(path);
    }

    forEvent(category: string, action: string, label: string, value: any, options: IGoogleAnalyticsOptions) {
        let eventArgs: EventArgs = {category, action, label, value};
        if (options && options.transport) {
            eventArgs.transport = options.transport;
        }
        if (options && options.nonInteraction !== undefined) {
            eventArgs.nonInteraction = options.nonInteraction;
        }
        event(eventArgs);
    }

    initialize() {
        initialize(this.config.accountID);
    }
}

export default GoogleAnalyticsProvider;