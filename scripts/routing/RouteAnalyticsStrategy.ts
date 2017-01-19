import IRouteAnalyticsStrategy from "./IRouteAnalyticsStrategy";
import IAnalyticsProvider from "../provider/IAnalyticsProvider";
import {RegistryEntry} from "ninjagoat";
import {RouterState} from "react-router";
import {inject, injectable} from "inversify";

@injectable()
class RouteAnalyticsStrategy implements IRouteAnalyticsStrategy {

    constructor(@inject("IAnalyticsProvider") private analyticsProvider: IAnalyticsProvider) {
    }

    enter(entry: RegistryEntry<any>, nextState: RouterState){
        let needTracking = <boolean>Reflect.getMetadata("ninjagoat:page", entry.construct);
        if (needTracking)
            this.analyticsProvider.pageview(nextState.location.pathname);
    }
}

export default RouteAnalyticsStrategy;