import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {Dictionary} from "ninjagoat";
import * as Promise from "bluebird";

export class MockCommandDispatcher implements ICommandDispatcher {

    dispatch(command: Object, metadata?: Dictionary<any>): Promise<CommandResponse> {
        return null;
    }
}
