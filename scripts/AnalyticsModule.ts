import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import {IViewModelRegistry, IServiceLocator} from "ninjagoat";

class AnalyticsModule implements IModule {

    modules = (container: interfaces.Container) => {

    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {

    }

}