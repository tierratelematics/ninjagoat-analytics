import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import {IViewModelRegistry, IServiceLocator, IRouteStrategy} from "ninjagoat";
import RouteAnalyticsStrategy from "./TrackPageRouteStrategy";
import IAnalyticsProvider from "./interfaces/IAnalyticsProvider";
import GoogleAnalyticsProvider from "./GoogleAnalyticsProvider";
import {ITrackingManager} from "./interfaces/ITrackingManager";
import TrackingManager from "./TrackingManager";
import TrackingCommandDispatcher from "./TrackingCommandDispatcher";
import {ICommandDispatcher, CommandDispatcherEnricher} from "ninjagoat-commands";

class AnalyticsModule implements IModule {

    modules = (container: interfaces.Container) => {
        container.bind<IAnalyticsProvider>("IAnalyticsProvider").to(GoogleAnalyticsProvider).inSingletonScope();
        container.bind<ITrackingManager>("ITrackingManager").to(TrackingManager).inSingletonScope();
        container.bind<IRouteStrategy>("IRouteStrategy").to(RouteAnalyticsStrategy).inSingletonScope();

        container.unbind("ICommandDispatcher");
        container.bind<ICommandDispatcher>("ICommandDispatcher").to(TrackingCommandDispatcher).inSingletonScope();
        container.bind<ICommandDispatcher>("ICommandDispatcher").to(CommandDispatcherEnricher).inSingletonScope().whenInjectedInto(TrackingCommandDispatcher);
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        serviceLocator.get<ITrackingManager>("ITrackingManager").initialize();
    }

}

export default AnalyticsModule;