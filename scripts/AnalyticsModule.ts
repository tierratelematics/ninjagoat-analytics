import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import {IViewModelRegistry, IServiceLocator} from "ninjagoat";
import IRouteAnalyticsStrategy from "./routing/IRouteAnalyticsStrategy";
import RouteAnalyticsStrategy from "./routing/RouteAnalyticsStrategy";
import IAnalyticsProvider from "./provider/IAnalyticsProvider";
import AnalyticsProvider from "./provider/AnalyticsProvider";

class AnalyticsModule implements IModule {

    modules = (container: interfaces.Container) => {
        container.bind<IAnalyticsProvider>("IAnalyticsProvider").to(AnalyticsProvider).inSingletonScope();
        container.bind<IRouteAnalyticsStrategy>("IRouteAnalyticsStrategy").to(RouteAnalyticsStrategy).inSingletonScope();
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        serviceLocator.get<AnalyticsProvider>("IAnalyticsProvider").initialize();
    }

}

export default AnalyticsModule;