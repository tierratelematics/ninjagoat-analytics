import {RegistryEntry, IRouteStrategy} from "ninjagoat";
import {RouterState} from "react-router";
import {inject, injectable, optional} from "inversify";
import {ITrackingManager} from "./interfaces/ITrackingManager";
import * as Bluebird from "bluebird";

@injectable()
class TrackPageRouteStrategy implements IRouteStrategy {

    constructor(@inject("ITrackingManager") private trackingManager: ITrackingManager,
                @inject("IRouteStrategy") @optional() private routeStrategy: IRouteStrategy) {
    }

    async enter(entry: RegistryEntry<any>, nextState: RouterState): Bluebird<string> {
        try {
            if (this.routeStrategy)
                await this.routeStrategy.enter(entry, nextState);
        }
        catch (error) {

        }

        let needTracking = <boolean>Reflect.getMetadata("ninjagoat:page", entry.construct);
        if (needTracking)
            this.trackingManager.trackPage(nextState.location.pathname);
        Bluebird.resolve("");
    }
}

export default TrackPageRouteStrategy;