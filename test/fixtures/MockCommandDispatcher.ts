import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {Dictionary} from "ninjagoat";

export class MockCommandDispatcher implements ICommandDispatcher {

    dispatch(command: Object, metadata?: Dictionary<any>): Promise<CommandResponse> {
        return null;
    }
}
