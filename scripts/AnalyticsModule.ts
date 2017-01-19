import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import UniversalAnalytics = require("universal-analytics");

class AnalyticsModule implements IModule {

    modules = (container: interfaces.Container) => {
        container.bind<any>("UniversalAnalytics").to(UniversalAnalytics).inSingletonScope();
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
    }
}