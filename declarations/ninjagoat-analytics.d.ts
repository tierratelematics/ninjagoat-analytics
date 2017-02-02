import {interfaces} from "inversify";
import {IModule} from "ninjagoat";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import {IRouteStrategy} from "ninjagoat";
import {RegistryEntry} from "ninjagoat";
import {RouterState} from "react-router";

export class AnalyticsModule implements IModule {

    modules: (container: interfaces.Container) => void;

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void;
}

export interface IAnalyticsConfig {
    accountID: string
}

export interface IAnalyticsProvider {
    forPage(path: string);
    forEventOf(event: Object);
    forEvent(category: string, action: string, label: string, value: any);
    initialize();
}

export interface ITrackingManager extends IAnalyticsProvider {
}

export class GoogleAnalyticsProvider implements IAnalyticsProvider {
}

export class TrackPageRouteStrategy implements IRouteStrategy {
    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string>;
}

export class GoogleAnalyticsProvider implements IAnalyticsProvider {
    constructor(config: IAnalyticsConfig);

    forPage(path: string);

    forEventOf(event: Object);

    forEvent(category: string, action: string, label: string, value: any);

    initialize();
}

export function Page();
export function DoNotTrack();
export function TrackingData(category: string, action?: string, label?: string);