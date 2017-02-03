import {RegistryEntry, IRouteStrategy} from "ninjagoat";
import {RouterState} from "react-router";
import {inject, injectable} from "inversify";
import {ITrackingManager} from "./interfaces/ITrackingManager";
import * as Promise from "bluebird";

@injectable()
class TrackPageRouteStrategy implements IRouteStrategy {

    constructor(@inject("ITrackingManager") private trackingManager: ITrackingManager,
                @inject("IRouteStrategy") private routeStrategy: IRouteStrategy) {
    }

    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string> {
        return this.routeStrategy.enter(entry, nextState).then(url => {
            let needTracking = <boolean>Reflect.getMetadata("ninjagoat:page", entry.construct);
            if (needTracking)
                this.trackingManager.forPage(nextState.location.pathname);
            return url;
        });
    }
}

export default TrackPageRouteStrategy;