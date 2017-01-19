import IAnalyticsProvider from "../provider/IAnalyticsProvider";
import {RegistryEntry, IRouteStrategy} from "ninjagoat";
import {RouterState} from "react-router";
import {inject, injectable} from "inversify";
import * as Bluebird from "bluebird";

@injectable()
class RouteAnalyticsStrategy implements IRouteStrategy {

    constructor(@inject("IAnalyticsProvider") private analyticsProvider: IAnalyticsProvider,
                @inject("IRouteStrategy") private routeStrategy: IRouteStrategy) {
    }

    async enter(entry: RegistryEntry<any>, nextState: RouterState): Bluebird<string> {
        try {
            if(this.routeStrategy)
                await this.routeStrategy.enter(entry,nextState);
        }
        catch(error){

        }

        let needTracking = <boolean>Reflect.getMetadata("ninjagoat:page", entry.construct);
        if (needTracking)
            this.analyticsProvider.pageview(nextState.location.pathname);
        return Bluebird.resolve("");
    }
}

export default RouteAnalyticsStrategy;