import {RegistryEntry} from "ninjagoat";
import {RouterState} from "react-router";

interface IRouteAnalyticsStrategy {
    enter(entry: RegistryEntry<any>, nextState: RouterState);
}

export default IRouteAnalyticsStrategy;