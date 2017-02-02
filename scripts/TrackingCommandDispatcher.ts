import {injectable, inject} from "inversify";
import {Dictionary} from "ninjagoat";
import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {ITrackingManager} from "./interfaces/ITrackingManager";
import * as Promise from "bluebird";

@injectable()
class TrackingCommandDispatcher implements ICommandDispatcher {
    category:string;
    action:string;
    label:string;

    constructor(@inject("ITrackingManager") private trackingManager: ITrackingManager,
                @inject("CommandDispatcher") private commandDispatcher: ICommandDispatcher) {
    }

    dispatch(command: Object, metadata?: Dictionary<any>): Promise<CommandResponse> {
        if (!Reflect.getMetadata("ninjagoatAnalytics:NotTrack", command.constructor)) {
            this.extractTrackingMetadata(command);
            this.trackingManager.forEvent(this.category, this.action, this.label, command);
        }
        return this.commandDispatcher.dispatch(command);
    }

    private extractTrackingMetadata(command: Object): void {
        this.category = Reflect.getMetadata("ninjagoatAnalytics:category", command.constructor) || "";
        this.action = Reflect.getMetadata("ninjagoatAnalytics:action", command.constructor) || "";
        this.label = Reflect.getMetadata("ninjagoatAnalytics:label", command.constructor) || "";
    }
}

export default TrackingCommandDispatcher