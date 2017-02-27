import {RegistryEntry, IRouteStrategy} from "ninjagoat";
import {RouterState} from "react-router";

export class MockRouteStrategy implements IRouteStrategy {
    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string> {
        return null;
    }
}