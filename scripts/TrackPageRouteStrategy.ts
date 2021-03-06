import {RegistryEntry, IRouteStrategy} from "ninjagoat";
import {RouterState} from "react-router";
import {inject, injectable} from "inversify";
import {ITrackingManager} from "./interfaces/ITrackingManager";

@injectable()
class TrackPageRouteStrategy implements IRouteStrategy {

    constructor(@inject("ITrackingManager") private trackingManager: ITrackingManager,
                @inject("RouteStrategy") private routeStrategy: IRouteStrategy) {
    }

    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string> {
        return this.routeStrategy.enter(entry, nextState).then(url => {
            let needTracking = <boolean>Reflect.getMetadata("ninjagoatAnalytics:track", entry.construct);
            if (needTracking) {
                let pageName = Reflect.getMetadata("ninjagoatAnalytics:page_name", entry.construct);
                this.trackingManager.forPage(pageName || nextState.location.pathname);
            }
            return url;
        });
    }
}

export default TrackPageRouteStrategy;