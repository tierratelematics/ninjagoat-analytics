import {injectable, inject} from "inversify";
import {Dictionary} from "ninjagoat";
import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {ITrackingManager} from "./interfaces/ITrackingManager";
import * as Promise from "bluebird";

@injectable()
class TrackingCommandDispatcher implements ICommandDispatcher {

    constructor(@inject("ITrackingManager") private trackingManager: ITrackingManager,
                @inject("CommandDispatcher") private commandDispatcher: ICommandDispatcher) {
    }


    dispatch(command: Object, metadata?: Dictionary<any>): Promise<CommandResponse> {
        if (!Reflect.getMetadata("ninjagoatAnalytics:NotTrack", command.constructor))
            this.trackingManager.forEvent("", "", "", command);
        return this.commandDispatcher.dispatch();
    }
}

export default TrackingCommandDispatcher