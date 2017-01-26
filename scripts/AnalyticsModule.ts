import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import {IViewModelRegistry, IServiceLocator, IRouteStrategy} from "ninjagoat";
import RouteAnalyticsStrategy from "./routing/TrackPageRouteStrategy";
import IAnalyticsProvider from "./provider/IAnalyticsProvider";
import AnalyticsProvider from "./provider/GoogleAnalyticsProvider";

class AnalyticsModule implements IModule {

    modules = (container: interfaces.Container) => {
        container.bind<IAnalyticsProvider>("IAnalyticsProvider").to(AnalyticsProvider).inSingletonScope();
        container.bind<IRouteStrategy>("IRouteStrategy").to(RouteAnalyticsStrategy).inSingletonScope();
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        serviceLocator.get<AnalyticsProvider>("IAnalyticsProvider").initialize();
    }

}

export default AnalyticsModule;