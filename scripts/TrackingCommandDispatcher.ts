import {injectable, inject} from "inversify";
import {IDateRetriever} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import {CommandDispatcher} from "ninjagoat-commands";
import {ITrackingManager} from "./interfaces/ITrackingManager";
import * as Promise from "bluebird";

@injectable()
class TrackingCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever: IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator: IGUIDGenerator,
                @inject("ITrackingManager") private trackingManager: ITrackingManager,
                @inject("CommandDispatcher") private commandDispatcher: ICommandDispatcher) {
        super(dateRetriever, guidGenerator);
        this.setNext(commandDispatcher);
    }

    canExecuteCommand(command: Object): boolean {
        if (!Reflect.getMetadata("ninjagoatAnalytics:NotTrack", command.constructor))
            this.trackingManager.forEvent("", "", "", command);
        return false;
    }

    executeCommand(envelope: CommandEnvelope): Promise<CommandResponse> {
        return null;
    }
}

export default TrackingCommandDispatcher